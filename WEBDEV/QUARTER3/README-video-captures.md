1) 12.16.2022
2) PROBLEM: mp4 with no m4a
3) using windows voice recorder, add m4a to mp4
4) PROBLEM: original video run at 2x and recorded. So I had to rerecord the video at 2x (about 400 MB and 5:36 min, compared to about 800MB and 10 or 11 minutes. 
5) Rerecorded to have same duration as voice recorded m4a file
6) slight different time and not synced, so I had to find how to add/replace m4a in a mp4 file.
7) Lower resolution:
gammastudent@counter-top MINGW64 ~/Videos/Captures
$ /c/Users/Public/PublicPrograms/ffmpeg-5.1.2-essentials_build/ffmpeg-5.1.2-essentials_build/bin/ffmpeg -i 2023week01-js-review-array-methods.mp4 -s hd480 -strict -2 2023week01-js-review-array-methods-small.mp4

8) This seems to be better than the previous command: the speed is 3 or 4x compared with just 2x or less

9) Now, the command I found to overwrite m4a on mp4:
gammastudent@counter-top MINGW64 ~/Videos/Captures
$ /c/Users/Public/PublicPrograms/ffmpeg-5.1.2-essentials_build/ffmpeg-5.1.2-essentials_build/bin/ffmpeg -i 2023week01-ex1a-test1b.m4a -i 2023week01-ex1a-test1a.mp4 -vcodec copy -acodec copy -shortest -map 0:a -map 1:v  combined1d.mp4

10)

https://superuser.com/questions/1557380/ffmpeg-overwrite-audio-in-video-until-audio-ends
https://superuser.com/questions/1557380/ffmpeg-overwrite-audio-in-video-until-audio-ends
https://superuser.com/questions/1557380/ffmpeg-overwrite-audio-in-video-until-audio-ends
https://superuser.com/questions/1557380/ffmpeg-overwrite-audio-in-video-until-audio-ends

DIT: video.mp4 and audio.aac are not files I have. I want to make a script that can work with any input files. Here are some scripts I currently have:

I can extract the audio from the video like this:

ffmpeg -i $1 -vn -acodec copy $2
I can replace the audio on a video with one from another file like this (keeping shortest length):

ffmpeg -i "$1" -i "$2" -vcodec copy -acodec copy -shortest -map 0:v -map 1:a "$3"
I can replace the audio on a video with one from another file like this (without keeping shortest length):

ffmpeg -i "$1" -i "$2" -vcodec copy -acodec copy -map 0:v -map 1:a "$3"
I can trim a video like this (I know it may not be very accurate without reencoding but works for me):

ffmpeg -ss "$1" -i "$2" -ss 0 -c copy -to "$3" -avoid_negative_ts make_zero "$4"
I want to do something like the third script but instead of silence after the audio ends, I want the original audio of the video.

 /c/Users/Public/PublicPrograms/ffmpeg-5.1.2-essentials_build/ffmpeg-5.1.2-essentials_build/bin/ffmpeg -i 2023week01-ex1a-test1a.m4a -i 2023week01-ex1a-test1a.mp4 -vcodec copy -acodec copy -shortest -map 0:a -map 1:v  combined1c.mp4


 /c/Users/Public/PublicPrograms/ffmpeg-5.1.2-essentials_build/ffmpeg-5.1.2-essentials_build/bin/ffmpeg -i 2023week01-ex1a-test1a.m4a -i 2023week01-ex1a-test1a.mp4 -vcodec copy -acodec copy -shortest -map 0:a -map 1:v  combined1c.mp4


 /c/Users/Public/PublicPrograms/ffmpeg-5.1.2-essentials_build/ffmpeg-5.1.2-essentials_build/bin/ffmpeg -i 2023week01-ex1a-test1a.m4a -i 2023week01-ex1a-test1a.mp4 -vcodec copy -acodec copy -shortest -map 0:a -map 1:v  combined1c.mp4


 /c/Users/Public/PublicPrograms/ffmpeg-5.1.2-essentials_build/ffmpeg-5.1.2-essentials_build/bin/ffmpeg -i 2023week01-ex1a-test1a.m4a -i 2023week01-ex1a-test1a.mp4 -vcodec copy -acodec copy -shortest -map 0:a -map 1:v  combined1c.mp4

gammastudent@counter-top MINGW64 ~/Videos/Captures
$ /c/Users/Public/PublicPrograms/ffmpeg-5.1.2-essentials_build/ffmpeg-5.1.2-essentials_build/bin/ffmpeg -i 2023week01-ex1a-test1b.m4a -i 2023week01-ex1a-test1a.mp4 -vcodec copy -acodec copy -shortest -map 0:a -map 1:v  combined1d.mp4



