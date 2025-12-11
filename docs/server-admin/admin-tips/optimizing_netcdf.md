This content is based on a [message from Roy Mendelssohn to the ERDDAP users group](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ).

1. Optimizing netcdf files for the cloud
————————————————-

a. repacking and page size

Recently in doing some research I came across this very interesting article:

https://nsidc.github.io/cloud-optimized-icesat2/

Nothing seems to inflame passions like discussions of programming languages, editors, and file formats, and this is not a recommendation of what format(s) you should use, but rather to understand what is in that paper and to see how much improvement can be gotten (ERDDAP™ has always tried to be agnostic about a lot of these matters, rather choosing to try and work with how people actually work with data).

The paper is mainly aimed at situations where the data are stored in an object store such as Amazon S3. Object stores are accessed over the network using http(s) commands, so compared to storage with a direct connection to the (virtual) server, there is a much longer latency as the request has to make a round trip. For object stores you want to make as few requests as possible, but if you just make really large requests to lessen the number of calls, you may be accessing way more data than you need, which can be equally slow if not more so. So the trick is to achieve a balance between these two factors. And even though access to data on object stores has greatly improved, so has access to directly attached storage. In researching this some estimates are:

Local Disk:
• Seek time: 0.1ms
• 6 seeks: 0.6ms (negligible)
• Reading scattered metadata is fast
Cloud HTTP:
• Request latency: 100-200ms
• 6 requests: 600-1200ms (very slow!)
• Each request has network round-trip time

The second thing to understand is that netcdf4/hdf5 files are stored in chunks and returned in pages, so the relative size of each of these can really affect access speed when access is from an object store, and that by default the metadata about the file are scattered throughout the file, so getting the metadata may take several requests. The main point of the paper is that the default page size for netcdf4/hdf5 files is 4096 bytes (4KB) - (which is terrible for cloud!) since the metadata size alone is likely larger than this and more than likely your chunk sizes are also larger than this. So an extract will require a lot round-trips which is slow. What you want to do is repack the file so that all the metadata is at the “top” of the file, and that the page size is at least as big as the metadata size plus the size of one chunk. Also by default the page size is not fixed, but uses a strategy that varies. What the paper found is using a fixed page size produced better results.

So how can I determine the file metadata size?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

And how can I determine chunk size:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

or

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

And how can I determine the page sizing strategy:

> h5stat yourfile.nc | grep "File space management strategy"
>

Most likely this command will return “H5F_FSPACE_STRATEGY_FSM_AGGR” which is the default strategy and what we want it to return is “H5F_FSPACE_STRATEGY_PAGE”

How can i repack my netcdf file so that all metadata is at the front, and change the strategy so that a fixed page size is used, and what page size to use? Rules of thumb that I found are:

Page Size Selection:
• Must be ≥ total file metadata size (critical!)
• Should be power of 2 (4MB, 8MB, 16MB, etc.)
• Don't go crazy large - 32MB is usually the practical max
• Consider chunk sizes - page size should accommodate largest chunks

As said above, ideally the size should be greater than the metadata size plus the size of one chunk. What the study found is that for a lot of datasets the 8MB page size is a good tradeoff, it is probably larger than the metadata size + chunk size, and doesn’t pull way more data than you need. To accomplish this:

h5repack -S PAGE -G 8388608 yourfile.nc yourfile_optimized.nc

Here are the values to use to get different page sizes:

4194304 (4MB)
8388608 (8MB)
16777216 (16MB)
33554432 (32MB)

b. Are there benefits if using files locally also?

The paper and other things I have found suggest that even locally there can be a speed gain anywhere from 10%-30%. In my anything but exhaustive tests I found speed gains of around 10% when the requests are relatively small compared to the overall file size, and the speed increase diminishes as the request gets larger, but I never found it to be slower.

c. TANSTAAFL

Ah but there much be a catch somewhere, this seems like a free lunch. And the catch is that the fixed page size increases the size of of the file. For some of the cases I tried:

617M mur1.nc
632M mur1_optimized.nc
608M mur2.nc
616M mur2_optimized.nc
29M chla1.nc
40M chla1_optimized.nc
30M chla2.nc
40M chla2_optimized.nc

So the tradeoff is there is a not insignificant increase in file size.

d. But if I have to reprocess the files anyway……?

A good question is if I have to write a script to reprocess the files, why not just write a script to translate to a format like say zarr? zarr has many proponents and if you are interested in zarr just do a quick duckduckgo search and there a lot of good posts, a perhaps more balanced view is at https://www.youtube.com/watch?v=IEAcCmcOdJs (it is interesting that many of the points he raises are what the icechunk format are trying to address). So why might you not want to translate your files to something like zarr, First, if you create netcdf files regularly, you could start optimizing the files from now on, which over time will see speed gains and you will not have to reformat past files, and ERDDAP™ will still be able to aggregate over the files even though some of the internal settings differ. Second, you might have a lot of tooling that depends on netcdf files, and this approach would mean not having to retool what could be an extensive amount of code. The point is to be aware of options and choose what works best for your situation. Just as a reminder, if you choose to use zarr files with ERDDAP™, they must be zarr format v2 files.

e. Big data - an aside

Big data is talked about a lot, but how big is the data that most people use and how does that compare with the capabilities of modern laptops (yes laptops, not servers). An interesting take is at:

https://www.youtube.com/watch?v=GELhdezYmP0 Start around minute 37 though the whole talk is interesting

The study he mentions is at:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

So there are a relatively small percentage of users who really need to crank up the power, but the overwhelming majority of users can do their analyses on a laptop, 26TB external drives are now under $300 and rumors are that 60TB external drives will be available by the end of the year. Something to think about.

2. Using ERDDAP™ with Google Cloud Platform or other cloud providers besides AWS
----------------------------------------------------------------------------------------------------------------------

At the moment ERDDAP™ is known only to work with AWS object stores (S3), though improving and generalizing ERDDAP™’s object store support is on the todo list (see https://github.com/ERDDAP/erddap/issues/158). So what to do if you are told you have to run your ERDDAP™ on Google Cloud Platform (GCP) or a similar platform? First, most cloud platforms offer different levels of storage, usually including one that is similar to local storage and is recognized by the operating system, one that is connected over the network usually using NFS for access (again directly accessible by the OS), and one that is an object store. The first solution is not to use object stores, and you would be good to go. But as always, TANSTAAFL and the drawback in this case is as you go from object store -> NFS access -> local store your costs also go up. (I would add that NFS is also accessed over the network, and has its own latency issues, this would also benefit from file optimization).

If you have to use object store, or can only afford an object store, the answer is a FUSE file system (https://github.com/libfuse/libfuse). On GCP, this is called gcsfuse, and the steps to install it are:

• Install gcsfuse on your GCP Linux image:
sudo apt update
sudo apt install gcsfuse
• Authenticate to GCP (if not already authenticated):
Ensure you have the right credentials, typically through the service account or by running gcloud auth login.
• Mount the GCS bucket to a local directory:
Mount your GCS bucket to a local directory using gcsfuse. This allows your GCP instance to access the data as if it were part of the local filesystem.
gcsfuse your-bucket-name /path/to/mount/directory

And now your object store can be accessed like it is part of the Linux filesystem, so will work with ERDDAP™. This seems like magic, getting the best of both worlds, there must be a catch. And there is. FUSE file systems are a good bit slower than accessing the object store directly (basically you have added another layer to the access). In my research estimates of how much slower are all over the map, so I have no idea how much slower. But if you are in a situation where you must run on GCP using object stores, you have a solution for now that will work with ERDDAP™.

3. What you can do now to help.
—————————————————————

If you have the time and ability to test some of these things and report back on your results, that would be great. Especially if you have access to GCP or similar and see how much slower ERDDAP™ access is using FUSE (well actually you can test this on AWS also). If the speed penalty is not too great, that would be wonderful, because I have reason to believe some people will soon have to run their ERDDAP™s on GCP with object store. so this is not just a matter of theoretical interest.