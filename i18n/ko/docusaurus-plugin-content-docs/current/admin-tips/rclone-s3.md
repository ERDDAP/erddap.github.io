이 콘텐츠는 [로이 Mendelssohn의 메시지 ERDDAP 사용자 그룹](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) ·

최근에 AWS S3에 액세스하는 데 도움이되는 많은 문의를 얻고 있습니다. ERDDAP™ · 첫 번째, ERDDAP™ 버전 2.29은 비-AWS 객체 저장소에서도 작업해야 하는 S3 액세스가 향상됩니다. (감사합니다&#33;) · 그러나 이전에 FUSE 기반 시스템을 사용하여 S3 저장소가 서버 또는 VM의 파일 시스템처럼 나타납니다.

이것을 할 수있는 한 가지 방법은 "rclone"을 사용합니다. (https://rclone.org/) . rclone는 많은 다른 S3 체계에 작동하고, 많은 다른 조정이 가동 FUSE에서 속도 벌금의 일부를 상쇄할 수 있는 캐시 크기를 조정하기를 포함하여 성과를 낙관하기 위하여 있습니다. rclone를 사용하여 이점 ERDDAP TM는 S3와 모든 상호 작용을 처리하는 것입니다, 그래서 dataset 유형은 좋아합니다 EDDGrid FromNcFiles는 로컬 파일이 있다면 직접 사용할 수 있습니다. 이것은 객체 저장소에 접근하기 위해 rclone 설정 방법을 파악해야하며 나머지는 정상적인 Linux 유형 설정입니다.

이제 난 그냥 그에 그것을 왼쪽, 그리고 예를 제공하지 않는 경우 다시 놓을 것입니다. 다음에 나는 익명으로 마운트하려고 NOAA Goes17 데이터는 Ubuntu 서버 중 하나에 공개 액세스 AWS S3 저장소에 있습니다. 초기 설정에서 rclone 프로세스는 모든 작업을 테스트하는 것이 더 쉽게 테스트 할 수 있도록 전경에서 실행됩니다. 그리고 배경에서 ii를 서비스로 전환하는 방법을 논의 할 것입니다. 아래에있는 것을 참고하십시오. 캐시는 1GB로 설정됩니다. 성능은 훨씬 더 큰 캐시를 만들기에 의해 향상 될 수있다, 5GB-10GB 또는 더 큰 말한다. 또한 설정은 성능을 최적화 할 수있는 것에 내 추측이지만 최선의 것일 수 없습니다. ERDDAP™ ·


1. 필요한 소프트웨어를 설치:
——————————————————

sudo apt 업데이트
sudo apt 설치 rclone fuse3 ₢ 킹

2. 익명 S3 리모트 만들기
————————————————————

rclone config는 go17 s3 \\를 만듭니다
공급자 AWS \\
지역 us-east-1 \\
location_constraint 우리-east-1 \\
엠에디터 매크로 참조:Env_auth false
익명 true

3. 시험하다.
——————

rclone lsd go17:noaa-goes17 | 이름 *

4. 데이터를 위한 마운트 포인트 생성
————————————————————

스도 mkdir -p /mnt/goes17
sudo chown $사용자:$사용자 /mnt/goes17

5. 데이터를 마운트. (이 프로세스는 전경에서 실행됩니다. 그래서 출력을 표시하고 거기 앉아) 
—————————

rclone -vv 산 go17:noa-goes17 /mnt/goes17 \\
--읽기 전용 \\
--vfs-cache-mode 전체 \\
--vfs 캐시 최대 크기 1G \\
--vfs-cache-poll-interval 1m 이상
--vfs-read-chunk-크기 64만엔
--vfs-read-chunk-크기 제한 1G \\
--vfs 읽기 머리 256M 이상
--부퍼사이즈 64M \\
--dir-cache-time 24시간 \\
--에트 타임 아웃 1s \\
--없음

6. 서버에서 새 탭을 열고 확인
——————————————————————————

ls /mnt / 고스17 | 이름 *

7. 해당 데이터는 액세스 할 수 있습니다.
———————————————————
cd/mnt/goes17/ABI-L1b-RadC/2023/010/15
채용정보 - 시간 OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 .nc 
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
그 결과, 특히 우리의 설치가 세계에서 가장 빠른 파이프를 가지고 있기 때문에 신속하게 상승했다.

8. 시스템 서비스로 (사용자 등에 적합한 수정) ::
———————————————

· systemd 단위를 만듭니다:

sudo nano /etc/systemd/system/rclone-goes17.service

그리고 입력:

[단위]
Description=Rclone 마운트 GOES17 공공 S3
After=network 온라인 .tar 이름 *

[서비스]
타입=simple
사용자=ubuntu
ExecStart=/usr/bin/rclone 산 go17:noaa-goes17 /mnt/goes17 \\
--읽기 전용 \\
--vfs-cache-mode 전체 \\
--vfs 캐시 최대 크기 1G \\
--vfs-cache-poll-interval 1m 이상
--vfs-read-chunk-크기 64만엔
--vfs-read-chunk-크기 제한 1G \\
--vfs 읽기 머리 256M 이상
--부퍼사이즈 64M \\
--dir-cache-time 24시간 \\
--에트 타임 아웃 1s \\
--없음 \\
--s3-no-check-bucket
ExecStop=/빈/fusermount3 -u /mnt/goes17
나머지 = 통로
나머지 = 10

[설치]
WantedBy=멀티 사용자 .tar 이름 *

₢ 킹 서비스 및 시작:

sudo systemctl 데몬로드
sudo systemctl 활성화 --지금 rclone-goes17

· 제품정보

systemctl 상태 rclone-goes17
ls /mnt / 고스17 | 이름 *



희망적으로 이것은 사람들에게 사용할 것입니다. Google Cloud Platform의 gcsfuse를 사용하여 몇 가지 성공으로 계층적인 이름 공간이 있습니다. rclone의 한 이점 (해당 이용 후기에 달린 코멘트가 없습니다.) 성능 최적화에 더 많은 설정이 있습니다. 지역으로 이동하는 경우 특히 ERDDAP™ 구름에, 이것은 거의 이음새가 없는 전환을 만들 수 있습니다.
