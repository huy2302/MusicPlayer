const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = document.querySelector('#progress')
// CDThumb Rotate
const cdThumbAnimate = cdThumb.animate([
    {   transform: 'rotate(360deg)'}
], {
    duration: 10000,
    iterations: Infinity
})
const cdWidth = cd.offsetWidth


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    songs: [
        {
            name: "Pink Venom",
            singer: "BLACKPINK",
            path: "musics/blackpink/pinkvenom.mp3",
            image: "img/blackpink/pinkvenom.jpg"
        },
        {
            name: "Hãy Trao Cho Anh",
            singer: "Sơn Tùng M-TP",
            path: "musics/sontung/haytraochoanh.mp3",
            image: "img/sontung/haytraochoanh.jpg"
        },
        {
            name: "Shay Nắng",
            singer: "AMEE",
            path: "musics/amee/thaymoicogaiiuanh.mp3",
            image:
                "img/amee/thaymoicogaiiuanh.jpg"
        },
        {
            name: "Anh Sai Rồi",
            singer: "Sơn Tùng M-TP",
            path:
                "musics/sontung/asairoi.mp3",
            image: "img/sontung/asairoi.jpg"
        },
        {
            name: "Khuôn Mặt Đáng Thương",
            singer: "Sơn Tùng M-TP",
            path: "musics/sontung/khuonmatdangthuong.mp3",
            image:
                "img/sontung/khuonmatdangthuong.webp"
        },
        {
            name: "Lạc Trôi",
            singer: "Sơn Tùng M-TP",
            path: "musics/sontung/lactroi.mp3",
            image:
                "img/sontung/lactroi.jpg",
        },
        {
            name: "Em Của Ngày Hôm Qua",
            singer: "Sơn Tùng M-TP",
            path: "musics/sontung/emcuangayhomqua.mp3",
            image:
                "img/sontung/nangamxadan.jfif"
        }
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')

    },
    handleEvents: function() { 
        const _this = this
        const showDashboardBtn = $$('.btn-showDashboard')
        const btnShowDash = $('.btn-down')
        const btnHideDash = $('.btn-up')
        var count = 1
       
        // chỉnh kích thước của Thumb
        document.onscroll = function() {    
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
            
            // Click show Dashboard
            showDashboardBtn.forEach(function(e) {
                e.onclick = function (){
                    if (count % 2 == 0) {
                        if (newCdWidth <= 0) {
                            var newCdWidthShow = 0
                            cd.style.width = newCdWidthShow + 'px'
                            cd.style.opacity = newCdWidthShow / cdWidth
                        } else {
                            cd.style.width = newCdWidth + 'px'
                            cd.style.opacity = newCdWidth / cdWidth
                        } 
                        btnShowDash.classList.remove('display-none')
                        btnHideDash.classList.add('display-none')
                        count++
                    }else { 
                        cd.style.width = cdWidth + 'px'
                        cd.style.opacity = 1
                        btnShowDash.classList.add('display-none')
                        btnHideDash.classList.remove('display-none')
                        count++
                    }
                }
            })
        }

        // Dừng quay khi bắt đầu 
        cdThumbAnimate.pause()

        // xử lí khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
                cdThumbAnimate.pause()
            } else {
                audio.play()
                cdThumbAnimate.play()
            }
        }
        
        // khi bài hát được play 
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumb.classList.add('cd-thumb-rotate')
        }
        // Khi bài hát bị pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            // cdThumb.classList.remove('cd-thumb-rotate')
        }
        // Khi bài hát đang play
        // Thanh line di chuyển
        audio.ontimeupdate = function(){
            const progressPercent = audio.currentTime / audio.duration * 100
            const timeStart = $('.time-start')
            const timeEnd = $('.time-end')

            if (isNaN(progressPercent)) {
                progress.value = 0
            } else {
                progress.value = Math.floor(audio.currentTime / audio.duration * 100)
                
                // Time bài hát khi bài hát play
                // Time End
                const totalSecondsEnd = audio.duration
                const minutesEnd = Math.floor(totalSecondsEnd / 60)
                const secondsEnd = (totalSecondsEnd % 60).toFixed(0)
                function padTo2Digits(num) {
                    return num.toString().padStart(2, '0')
                }
                const resultEnd = `${padTo2Digits(minutesEnd)}:${padTo2Digits(secondsEnd)}`
                timeEnd.innerHTML = resultEnd

                // Time live
                
                const totalSecondsLive = audio.currentTime
                const minutesLive = Math.floor(totalSecondsLive / 60)
                const secondsLive = (totalSecondsLive % 60).toFixed(0)
                function padTo2Digits(num) {
                    return num.toString().padStart(2, '0')
                }
                const resultLive = `${padTo2Digits(minutesLive)}:${padTo2Digits(secondsLive)}`
                timeStart.innerHTML = resultLive
            }

            // Tự động chuyển bài khi hết nhạc
            if (audio.currentTime == audio.duration) {
                _this.currentIndex += 1
                _this.loadCurrentSong()
                audio.play()
            }
            
        }
        // kiểm tra NaN
        function isNaN(x) {
            x = Number(x);
            return x != x;
        }

        // Thay đổi time nhạc bằng thanh line
        progress.onchange = function (e) {
            const seekTime = e.target.value 
            audio.currentTime = seekTime * audio.duration / 100
        }
        
        // Khi click chuyển nhạc
        // Next Song
        const nextSongBtn = $('.btn-next')
        nextSongBtn.onclick = function () {
            _this.nextSong()
            audio.play()
            cdThumbAnimate.play()
        }
        // Prev Song
        const prevSongBtn = $('.btn-prev')
        prevSongBtn.onclick = function () {
            _this.prevSong()
            audio.play()
            cdThumbAnimate.play()
        }
        // Random Song
        const randomSongBtn = $('.btn-random')
        randomSongBtn.onclick = function () {
            _this.randomSong()
            audio.play()
            cdThumbAnimate.play()
        }
        // Repeat Song
        const repeatSongBtn = $('.btn-repeat')
        repeatSongBtn.onclick = function () {
            if (_this.isRepeat) {
                _this.isRepeat = false
                audio.loop = false
            } else {
                _this.isRepeat = true
                audio.loop = true
            }
        }
    },
    // Định nghĩa thuộc tính cho Object
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', { 
            get: function() {
                return this.songs[this.currentIndex]
            }
        })

    },
    // Load bài hát hiện tại
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    repeatSong: function() {
        
    },
    nextSong: function() {
        this.currentIndex += 1
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex -= 1
        if (this.currentIndex < 0) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    randomSong: function() {
        this.currentIndex = Math.floor(Math.random() * this.songs.length)
        this.loadCurrentSong()
    },
    start: function() {
        //định nghĩa các thuộc tính cho Object
        this.defineProperties()

        // lắng nghe các sự kiện
        this.handleEvents()

        // load bài hát đầu tiên vào UI
        this.loadCurrentSong()

        // render playlist
        this.render()
    }
}
app.start()
var listSongs = $$('.song')
listSongs.forEach((song, index) => {
    song.onclick = () => {
    
    app.currentIndex = index
    app.loadCurrentSong()
    audio.play()
    cdThumbAnimate.play()
    }
})
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'a68832dd57mshef6629c0dc1fe4dp15c111jsn2902a7743fc3',
// 		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
// 	}
// };

// fetch('https://spotify23.p.rapidapi.com/tracks/?ids=4WNcduiCmDNfmTEz7JvmLv', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
