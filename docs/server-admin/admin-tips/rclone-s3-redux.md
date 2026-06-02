This content is based on a [message from Roy Mendelssohn to the ERDDAP users group](https://groups.google.com/g/erddap/c/H-vJoGP42TI).

Running ERDDAP™ in the cloud has become a hot topic.  I should note that ERDDAP™ has always run in the cloud,  just most of the time not on a server provided by a commercial cloud provider, and the major impediment for running ERDDAP™ on a commercial cloud provider is  if you use S3 storage,  which doesn’t allow for normal Linux block access.  If you are willing to pay more to use the block access options provided by your commercial cloud provider,  than running on a commercial cloud server is basically the same as running on your own equipment,  except of course the cost.

Having said that,  on Dec. 1, 2025 I wrote a post “rclone and S3” and this is a followup.  In that email I mounted the GOES17 swathes and checked a file,  but I didn’t take it all the way into ERDDAP™ to see that it all works smoothly.  And yes kiddos,  you can try this at home and you do not need to consult with a lawyer or medical advisor, it should all be safe.  Here I mount the NCDC OIsst avhrr v2.1 that is on AWS,  set it up in ERDDAP™ and the show the results.

- Step 1:  Define the endpoint in rclone

rclone config create oisst s3 \
  provider AWS \
  region us-east-1 \
  location_constraint us-east-1 \
  env_auth false \
  anonymous true


- Step 2: Create a mount point for the dataset

sudo mkdir -p /mnt/oisst
sudo chown "$USER:$USER" /mnt/oisst

- Step 3: mount the S3 storage to the mount point

Permissions,  permissions, permissions,  permissions…. (With apologies to Steve Ballmer, if you know you know),  

The mount must be done so that whatever user runs your tomcat,  usually user “tomcat”,  can access the data.  ‘rclone’ mounts the dataset with owner and group of the user that executes the mount command and wants to store information in the user's home directory (this is probably mitigated if you set this up as a system level process - see below).  So if you can,  execute the mount command as ’tomcat’,  but if like us your tomcat does not have a home directory you need to execute the mount command as a different user.   To do so edit the fuse.conf file:

1.  sudo vi /etc/fuse.conf

2.  Uncomment or add:

user_allow_other

3. Save and exit.


The actual data is several layers deep,  and I am mounting at the data level,  not at the top level,  and am executing the command in a tmux terminal so the command continues to run:

 rclone -vv mount oisst:noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oisst \
  --read-only \
  --allow-other \
  --vfs-cache-mode full \
  --vfs-cache-max-size 1G \
  --vfs-cache-poll-interval 1m \
  --vfs-read-chunk-size 64M \
  --vfs-read-chunk-size-limit 1G \
  --vfs-read-ahead 256M \
  --buffer-size 64M \
  --dir-cache-time 24h \
  --attr-timeout 1s \
  --no-modtime


- Step 4: Use GenerateDatasetsXml just like normal,  

Use EDDGridFromNcFiles as the datatype,  and the directory is /mnt/oisst/.  The initial pass was pretty good and worked without problems.  I made three changes to the xml snippet  that could have been done while running  GenerateDatasetsXml and those were:

1. Changed the datasetid to be oisst_rclone

2. The directory contains a mix of files some ending in “.nc" and others ending in “preliminary.nc” and only the former are desired.  To do this change the filename regex:

<fileNameRegex>oisst-avhrr-v02r01\.\d{8}\.nc</fileNameRegex>

I have often said that I find regex to be one of the mysteries of life, and there may be better ways of doing the regex.  But this worked

3. The ioos_category was not set,  I added those.

For permanent production work the xml snippet can use a little more editing to be more complete.  

- Step 5:  Add the xml snippet to the datasets.xml and set the flag

This takes a long time to load on first pass,  so go find other things to do for the rest of the day.

The final result is:

https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph

Now see that wasn’t too painful!

If you play with the result,  note first that the rclone settings are a first guess, and should be tested for optimization.  Jonathan Sherman of our group has looked at this some and may be talking about it in his talk at the IOOS DMAC meeting.  He will also be covering a lot more topics related to setting up in Google Cloud Platform,  such as how to orchestrate the setup of the VM,  setting up the S3 bucket to have a hierarchical name space which on GCP is faster and only a little more expensive,  and if you run processing scripts to update the data served by the ERDDAP™ how to set those up.  If this topic interests you I encourage you to listen to his talk.  The ERDDAP™ is up and running,  just it is  not accessible at the moment from outside the NMFS network.

Secondly this is not a AWS VM mounting an AWS S3 bucket,  this is one of our servers and our pipe these days is totally saturated,  so you would expect the former setup to be faster than what I have done ( well our pipe is not very big - thanks NMFS! - but are we ever saturated - demand for data has been phenomenal).  

Finally you may wonder -  I want to roll my own,  where do I start besides this?  I have found one thing LLMs are good at is information that is well known and well documented,  and the AIs I have checked (there goes all my tokens!!) all know rclone and AWS and GCP pretty well,  and can do most of the setup for you.  In fact I was looking for a dataset that would be good to demo, and an AI gave me several suggestions and generated most of what is above,  though I did make some edits for my own setup.

Also,  remember Seth wrote a new S3 for the present version (2.30)  of ERDDAP™ - I have not compared speeds,  and I imagine depending on what you are doing each will have its advantages.  For porting over an existing ERDDAP™ installation,  using rclone can simplify the process. 

-Roy

PS - And remember rclone works over a broad array of vendors,   this is not restricted to AWS and only some changes to the  “rclone config” settings are needed for a different vendor.


Make into a system service(modify as appropriate for user etc):
    —————————————————

[Unit]
Description=Rclone mount for NOAA OISST on AWS
Wants=network-online.target
After=network-online.target

[Service]
Type=notify
User=yourUser
Group=yourGroup

ExecStart=/usr/bin/rclone mount oisst:noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oisst \
  --read-only \
  --allow-other \
  --dir-perms 0755 \
  --file-perms 0644 \
  --vfs-cache-mode full \
  --vfs-cache-max-size 1G \
  --vfs-cache-poll-interval 1m \
  --vfs-read-chunk-size 64M \
  --vfs-read-chunk-size-limit 1G \
  --vfs-read-ahead 256M \
  --buffer-size 64M \
  --dir-cache-time 24h \
  --attr-timeout 1s \
  --no-modtime

ExecStop=/bin/fusermount -uz /mnt/oisst
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target