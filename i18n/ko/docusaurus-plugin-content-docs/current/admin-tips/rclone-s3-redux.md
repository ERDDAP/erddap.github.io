이 콘텐츠는 [로이 Mendelssohn의 메시지 ERDDAP 사용자 그룹](https://groups.google.com/g/erddap/c/H-vJoGP42TI) ·

지원하다 ERDDAP™ 구름에 뜨거운 화제가되었습니다. 나는 주의해야 ERDDAP™ 항상 클라우드에서 실행, 단지 대부분의 시간의 상업 클라우드 공급자에 의해 제공되지, 및 실행을위한 주요 impediment ERDDAP™ 상업 클라우드 공급자는 S3 스토리지를 사용하는 경우 일반 Linux 블록 액세스를 허용하지 않습니다. 상업 클라우드 서버에서 실행하는 것보다 상업 클라우드 공급자가 제공하는 블록 액세스 옵션을 사용하여 더 많은 비용을 지불하는 것은 기본적으로 자신의 장비에서 실행과 동일합니다. 물론 비용.

12 월 1, 2025에 말했다, 나는 포스트를 썼다 “클론과 S3” 그리고 이것은 후속이다. 그 이메일에서 GOES17 swathes를 거치고 파일을 검사했지만, 나는 모든 방법을 전혀 가지고 있지 않았다. ERDDAP™ 그것은 모두 원활하게 작동합니다. 그리고 네 kiddos, 당신은 집에서 이것을 시도 할 수 있으며 변호사 또는 의료 고문과 상담 할 필요가 없습니다. 모두 안전해야합니다. 여기 NCDC OI 마운트 sst AWS에 있는 avhrr v2.1는, 그것을 안으로 설치합니다 ERDDAP™ 그리고 결과를 보여줍니다.

- 단계 1: rclone에 있는 endpoint를 정의하십시오

rclone config 생성 oi sst s3 \\ ·
공급자 AWS \\
지역 us-east-1 \\
location_constraint 우리-east-1 \\
엠에디터 매크로 참조:Env_auth false
익명 true


- 단계 2: dataset를 위한 산 점을 창조하십시오

스도 mkdir -p /mnt/oi sst 
sudo chown "$USER:$USER" /mnt/oi sst 

- 단계 3: 산 점에 S3 저장을 거치하십시오

허가, 허가, 허가, 허가, 허가.... (Steve Ballmer에 사과로, 당신이 알고 있다면) ·

마운트는 사용자가 tomcat을 실행하는 것을 수행해야합니다, 일반적으로 사용자 "tomcat", 데이터에 액세스 할 수 있습니다. 'rclone'는 마운트 명령을 실행하고 사용자의 홈 디렉토리에 정보를 저장하려는 사용자의 소유자 및 그룹과 데이터 세트를 마운트 (이것은 아마도 시스템 수준의 프로세스로 이것을 설정하면 mitigated - 아래 참조) · 그래서, 마운트 명령을 'tomcat'으로 실행할 수 있지만, tomcat 같은 경우 다른 사용자로 마운트 명령을 실행할 필요가있는 홈 디렉토리가 없습니다. 그래서 신관을 편집하려면. conf 파일:

1. sudo vi /etc/fuse.conf는

2. 드문 또는 추가:

user_allow_other에 대해

3. 저장 및 출구.


실제 데이터는 여러 레이어가 깊어지고, 데이터 레벨에 설치되며, 상단 레벨이 아니라 tmux 터미널에서 명령을 실행하므로 명령이 계속 실행됩니다.

rclone -vvv 산 oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/이오 sst 이름 *
--읽기 전용 \\
--로그 기타 \\
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


- 단계 4: GenerateDatasets 사용 Xml는 정상 같이,

제품 정보 EDDGrid fromNcFiles as a datatype, 디렉토리는 /mnt/oi입니다. sst ·. 초기 패스는 꽤 좋은 문제없이 일했다. GenerateDatasets를 실행하면서 수행 할 수 있는 xml snippet에 세 가지 변화를 만들었습니다. Xml와 그 들은:

1. datasetid를 oi로 변경 sst _크론

2. 디렉토리에는 일부 파일의 혼합이 포함되어 있습니다 “ .nc "그리고 다른 사람은 "preliminary .nc ” 전만 원합니다. 이 변경하려면 filename regex:

 <fileNameRegex> 으로 sst -avhrr-v02r01\\.\\d&#123;8&#125;\\ .nc  </fileNameRegex> 

나는 종종 내가 regex를 찾을 것이라고 말했다 삶의 신비 중 하나, 그리고 regex를하는 더 나은 방법이 될 수있다. 그러나 이 일

3. ioos_category가 설정되지 않았습니다.

영구 생산 작업 xml 스니펫은 더 많은 편집을 사용할 수 있습니다.

- 단계 5: xml 스니펫을 추가 datasets.xml 플래그 설정

이것은 첫 번째 패스에로드 할 시간이 걸립니다, 그래서 하루의 나머지를 위해 할 다른 것들을 찾아.

마지막 결과는:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

이제 너무 고통스럽지 않았습니다&#33;

결과와 함께 플레이하면, 먼저 rclone 설정이 첫 번째 추측이며, 최적화를 위해 테스트해야합니다. 우리 그룹의 Jonathan Sherman은이 일부를보고 IOOS DMAC 회의에서 그의 이야기에 대해 이야기 할 수 있습니다. 그는 또한 VM의 설정을 오케스트라와 같은 구글 클라우드 플랫폼에서 설정과 관련된 많은 주제를 덮고, S3 버킷을 설정하여 GCP에 대한 계층적인 이름 공간이 빠르고 약간 더 비싸고, 처리 스크립트를 실행하면 데이터가 제공 한 데이터를 업데이트 할 수 있습니다. ERDDAP™ 그 위로 설정 하는 방법. 이 항목에 관심있는 경우 나는 자신의 이야기를 듣고 격려. 더 보기 ERDDAP™ 위로와 실행, 그냥 밖에서 순간에 접근 할 수 없습니다 NMFS 네트워크.

둘째로 AWS S3 버킷을 장착하는 AWS VM은 아니지만, 이는 우리 서버 중 하나이며, 이 날은 완전히 포화되어 있기 때문에 내가 수행 한 것보다 빠른 이전 설정이 기대됩니다. (잘 우리의 관은 아주 크지 않습니다 - 감사 NMFS &#33; - 그러나 우리는 이제 포화 - 데이터에 대한 수요가 현상되었습니다.) ·

마지막으로 궁금해 할 수 있습니다 - 나는 내 자신을 롤하고 싶습니다. 여기서 나는 이것을 시작합니까? 나는 LLMs가 잘 알려진 정보이며 잘 문서화 된 정보이며, AIs는 확인했습니다. (내 모든 토큰을 간다&#33;) 모든 알고 rclone 과 AWS 과 GCP 꽤 잘, 그리고 당신을 위한 체제의 대부분을 할 수 있습니다. 실제로 나는 데모에 좋은 데이터 세트를 찾고 있었다, AI는 나에게 여러 제안을 준하고, 내가 내 자신의 설정에 대한 몇 가지 편집을 만들었지 만, 위의 대부분의 생성.

또한 Seth는 현재 버전의 새로운 S3를 썼습니다. (2.30의) 이름 * ERDDAP™ - 나는 속도와 비교하지 않았고, 각 일을하는 것에 따라 상상해 그 이점이 있습니다. 기존의 포트링 ERDDAP™ rclone를 사용하여 임명은 과정을 간단하게 할 수 있습니다.

-로이

PS - 그리고 rclone는 납품업자의 넓은 배열 이상 작동합니다, 이것은 AWS에 제한되지 않으며 “rclone config” 조정에 몇몇 변화는 다른 납품업자를 위해 필요합니다.


시스템 서비스로 (사용자 등에 적합한 수정) ::
———————————————

[단위]
Description=Rclone 마운트 NOAA AWS의 OISST
Wants=network 온라인 .tar 이름 *
After=network 온라인 .tar 이름 *

[서비스]
타입=notify
사용자=yourUser
그룹=yourGroup

ExecStart=/usr/bin/rclone 산 oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/이오 sst 이름 *
--읽기 전용 \\
--로그 기타 \\
--dir-perms 0755 \\(으)로
--파일-perms 0644 \\
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

ExecStop=/빈/fusermount -uz /mnt / 이 sst 
restart=on-failure에
나머지 = 10

[설치]
WantedBy=멀티 사용자 .tar 이름 *
