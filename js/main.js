//GSAPアニメーション
const mv = document.querySelector('#mv');

//スクロールに応じたもの（勝手に逆再生される）
gsap.to('.mv__ttl', {
  translateY: -300,
  scrollTrigger: {
    //timelineの設定
    trigger: mv,
    //要素の　開始・終了位置　画面に対しての開始・終了ライン
    start: 'top top',
    end: '50% top', //終了位置
    markers: true,
    pin: true, //画面止まるかどうか
    scrub: true,//数字にして、増えると余韻が付く
  }
});

//スクロールに応じないもの（自動アニメ・逆再生可能）
// gsap.to('.mv__ttl', {
//   y: -300,
//   duration: 2,//所要時間
//   scrollTrigger: {
//     toggleActions: 'play none none reverse',
//     trigger: mv,
//     //要素の　開始・終了位置　画面に対しての開始・終了ライン
//     start: 'top top',//開始位置だけでOK
//     markers: true,
//     // pin: true, 必要ない！
//     // scrub: true, 必要ない！
//   }
// });

//スライドメニュー
const openBtn = document.querySelector('.menu__openBtn');
const closeBtn = document.querySelector('.menu__closeBtn');
const menu = document.querySelector('.menu__panel');
const menuLists = document.querySelectorAll('.menu__list');
const menuLinks = document.querySelectorAll('.menu__link');

// 開く設定
openBtn.addEventListener('click', () => {
  menu.classList.add('openMenu');

  menuLists.forEach((menuList, i) => {
    setTimeout(() => {
      menuList.classList.add('slideList');
    }, 300 * i);
  });
});

// 閉じる設定
const closeMenu = () => {
  menu.classList.remove('openMenu');
  menu.classList.add('closeMenu');

  menuLists.forEach((menuList, i) => {
    menuList.classList.remove('slideList');
  });
};

closeBtn.addEventListener('click', () => {
  closeMenu();
})

window.addEventListener('scroll', () => {
  closeMenu();
});

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });
});


//スクロールに応じたフェードイン
// 実行する処理
const animationFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('ok');
      entry.target.classList.add('fadeInAnimation');
      // 終わったら監視の終了
      obs.unobserve(entry.target);
    };
  });
};

// 監視設定
const fadeObserver = new IntersectionObserver(animationFade);

// 監視対象の指定
const fadeElements = document.querySelectorAll('.fadeIn');

fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});


//画像ギャラリー
const mainPic = document.querySelector('.gallery__mainPic');
const mainImg = document.querySelector('.gallery__mainImg');
const tmbImgs = document.querySelectorAll('.gallery__img');

tmbImgs.forEach((tmb) => {
  tmb.addEventListener('mouseover', (e) => {
    mainImg.src = e.target.src;
    mainPic.animate(
      //単純なアニメーションのためJSで記載
      { opacity: [0, 1] }, 500);
  });
});
