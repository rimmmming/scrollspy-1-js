import './style.css';

const navElem = document.querySelector('#nav');
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector('#contents');
const contentItems = Array.from(contentsElem.children);

const offsetTops = contentItems.map(elem => {
  const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
  return [ofs - clh / 2, ofs + clh / 2];
});

window.addEventListener('scroll', e => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = offsetTops.findIndex(
    ([from, to]) => scrollTop >= from && scrollTop < to
  );
  //상단 네비 버튼 on 클래스 제어
  Array.from(navElem.children).forEach((item, index) => {
    if (index !== targetIndex) item.classList.remove('on');
    else item.classList.add('on');
  });
});

navElem.addEventListener('click', e => {
  const targetElem = e.target;
  if (targetElem.tagName === 'BUTTON') {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }
});
