This content is based on a [message from Roy Mendelssohn to the ERDDAP users group](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ).

Recently, we have been getting a number of inquiries seeking help with accessing files on AWS S3 in ERDDAP™. First, ERDDAP™ version 2.29 will have improved S3 access which should work with non-AWS object stores also. (Thanks Seth!). But I have mentioned previously about using a FUSE based system to make the S3 store appear like a filesystem on your server or VM.

One way to do this is use “rclone”. (https://rclone.org/). rclone works on many different S3 systems, and has a lot of different settings to optimize performance, including setting a cache size, which hopefully can offset some of the speed penalty from running FUSE. The advantage of using rclone with ERDDAP ™ is that rclone handles all the interaction with S3, so dataset types like EDDGridFromNcFiles can be used directly as if there are local files. This means that you only need to figure out how to setup rclone to access your object store, and the rest is just normal Linux type setups.

Now I would be remiss if I just left it at that, and not give an example. In the following I am going to anonymously mount the NOAA Goes17 data that is on a public accessible AWS S3 store on one of our Ubuntu servers, In the initial setup the rclone process will be running in the foreground to make it easier to test that everything is working, and then I will discuss how to turn ii into a service running in the background. Note that in what is below, the cache is set to 1GB. Performance may well be enhanced by making the cache much larger, say 5GB-10GB or even bigger. Also the settings are my guesses at what may optimize performance, but may not be the optimal ones for ERDDAP™.


1. Install the necessary software:
————————————————————

sudo apt update
sudo apt install rclone fuse3 -y

2. Create an anonymous S3 remote
———————————————————————

rclone config create goes17 s3 \
provider AWS \
region us-east-1 \
location_constraint us-east-1 \
env_auth false \
anonymous true

3. Test that.
——————

rclone lsd goes17:noaa-goes17 | head

4. Create a mount point for the data
———————————————————————

sudo mkdir -p /mnt/goes17
sudo chown $USER:$USER /mnt/goes17

5. Mount the data. (Note this process runs in the foreground, so it will show some output and sit there)
——————————

rclone -vv mount goes17:noaa-goes17 /mnt/goes17 \
--read-only \
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

6. Open a new tab on the server and check
——————————————————————————

ls /mnt/goes17 | head

7. Check that data can be accessed
——————————————————————
cd /mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump -h OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461.nc
```
netcdf OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 {
dimensions:
y = 1500 ;
x = 2500 ;
number_of_time_bounds = 2 ;
band = 1 ;
number_of_image_bounds = 2 ;
num_star_looks = 24 ;
variables:
short Rad(y, x) ;
Rad:_FillValue = 1023s ;
Rad:long_name = "ABI L1b Radiances" ;
Rad:standard_name = "toa_outgoing_radiance_per_unit_wavenumber" ;
Rad:_Unsigned = "true" ;
Rad:sensor_band_bit_depth = 10b ;
Rad:valid_range = 0s, 1022s ;
Rad:scale_factor = 0.1760585f ;
Rad:add_offset = -5.2392f ;
Rad:units = "mW m-2 sr-1 (cm-1)-1" ;
Rad:resolution = "y: 0.000056 rad x: 0.000056 rad" ;
Rad:coordinates = "band_id band_wavelength t y x" ;
Rad:grid_mapping = "goes_imager_projection" ;
Rad:cell_methods = "t: point area: point" ;
Rad:ancillary_variables = "DQF" ;
.
.
.
.
```
The result was returned surprisingly quickly, particularly since our installation does not have the fastest pipe in the world.

8. Make into a system service(modify as appropriate for user etc):
—————————————————

a. Create a systemd unit:

sudo nano /etc/systemd/system/rclone-goes17.service

And enter:

[Unit]
Description=Rclone mount for GOES17 public S3
After=network-online.target

[Service]
Type=simple
User=ubuntu
ExecStart=/usr/bin/rclone mount goes17:noaa-goes17 /mnt/goes17 \
--read-only \
--vfs-cache-mode full \
--vfs-cache-max-size 1G \
--vfs-cache-poll-interval 1m \
--vfs-read-chunk-size 64M \
--vfs-read-chunk-size-limit 1G \
--vfs-read-ahead 256M \
--buffer-size 64M \
--dir-cache-time 24h \
--attr-timeout 1s \
--no-modtime \
--s3-no-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target

b. Enable the service and start:

sudo systemctl daemon-reload
sudo systemctl enable --now rclone-goes17

c. Test

systemctl status rclone-goes17
ls /mnt/goes17 | head



Hopefully this will be of use to people. We have been testing using gcsfuse on Google Cloud Platform with a bucket that has hierarchical name space with some success. One advantage of rclone (besides that it is not vendor specific) is that it has more settings to optimize performance. Particularly if you are moving a local ERDDAP™ to the cloud, this can make the transition almost seamless.
