const gameWrapper = document.querySelector('.gameWrapper');
const gameOver = document.querySelector('.gameOver');
const wormContainer = document.querySelector('.worm_container');
let points = 0;
let runAgainAt = Date.now();
let wormLength = 0;

const getSadInterval = () => Date.now() + 100;
const getHungryInterval = () => Date.now() + 500;
const getGoneInterval = () => Date.now() + Math.floor(Math.random() * 25000);
const getLeavingInterval = () => Date.now() + Math.floor(Math.random() * 18000);
const getKingStatus = () => Math.random() > 0.9;
const moles = [
  {
    status: 'hungry',
    next: getHungryInterval(),
    king: false,
    node: document.getElementById('mole01'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.getElementById('mole02'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.getElementById('mole03'),
  },
  {
    status: 'gone',
    next: getGoneInterval(),
    king: false,
    node: document.getElementById('mole04'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.getElementById('mole05'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.getElementById('mole06'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.getElementById('mole07'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.getElementById('mole08'),
  },
  {
    status: 'gone',
    next: getGoneInterval(),
    king: false,
    node: document.getElementById('mole09'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.getElementById('mole10'),
  },
];

function getNextStatus(mole) {
  switch (mole.status) {
    case 'hungry':
      mole.status = 'sad';
      mole.next = getSadInterval();
      mole.node.children[0].classList.toggle('hungry', false);
      if (mole.king) {
        mole.node.children[0].src = './images/king-mole-sad.png';
      } else {
        mole.node.children[0].src = './images/mole-sad.png';
      }
      break;
    case 'sad':
    case 'fed':
      mole.status = 'leaving';
      mole.next = getSadInterval();
      if (mole.king && mole.node.children) {
        mole.node.children[0].src = './images/king-mole-leaving.png';
      } else {
        mole.node.children[0].src = './images/mole-leaving.png';
      }
      break;
    case 'leaving':
      mole.status = 'gone';
      mole.next = getLeavingInterval();
      mole.node.children?.[0].classList.toggle('hide', true);
      break;
    case 'gone':
      mole.status = 'hungry';
      mole.next = getHungryInterval();
      mole.king = getKingStatus();
      mole.node.children?.[0].classList.toggle('hide', false);
      mole.node.children[0].classList.toggle('hungry', true);
      if (mole.king) {
        mole.node.children[0].src = './images/king-mole-hungry.png';
      } else {
        mole.node.children[0].src = './images/mole-hungry.png';
      }
      break;
  }
}

function init() {
  setInterval(() => {
    const moleOnChange = moles[Math.floor(Math.random() * moles.length)];
    getNextStatus(moleOnChange);
  }, 500);

  const feed = (e) => {
    if (e.target.tagName != 'IMG' || !e.target.classList.contains('hungry')) {
      return;
    }

    const mole = moles[+e.target.dataset.index];
    mole.status = 'fed';
    mole.next = getSadInterval();
    if (mole.king) {
      mole.node.children[0].src = './images/king-mole-fed.png';
      points += 20;
      wormLength += 180;
    } else {
      mole.node.children[0].src = './images/mole-fed.png';
      points += 10;
      wormLength += 90;
    }
    gameRules();

    if (wormLength <= 900) {
      wormContainer.style.maxWidth = wormLength + 'px';
    }

    if (points >= 10) {
      wormContainer.classList.remove('hide');
    }
  };

  gameWrapper.addEventListener('click', feed);

  function gameRules() {
    if (points >= 100) {
      wormLength = 0;
      points = 0;
      gameWrapper.classList.add('hide');
      gameOver.classList.remove('hide');
    }
    // mole.status = 'fed';
    // mole.next = getSadInterval();
    // mole.node.src = './images/mole-fed.png';
    // mole.node.classList.toggle('hungry');

    gameOver.addEventListener('click', () => {
      points = 0;
      gameWrapper.classList.remove('hide');
      gameOver.classList.add('hide');
      wormContainer.classList.add('hide');
      wormContainer.style.maxWidth = '0px';
    });
  }
}

init();
