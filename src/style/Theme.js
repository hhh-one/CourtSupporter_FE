// 자주쓰이는 css
const common = {
  flexCenter: `
  display: flex;
  justify-contents: center;
  align-items: center;
  `,
  flexCenterColumn: `
      display: flex;
      flex-direction: column;
      justify-contents: center;
      align-items: center;
  `,
}

const color = {
  main: '#286EF0',
  pending: '#FFC908',
  warning: '#FF1304',
  success: '#2BEFB4',
  white: '#FFF',
  black: '#000',
  darkgray: '#333',
  // background: '#f1f3f6',
  background: '#f1f3f7',
  middlegray: '#BDBDBD',
  lightgray: '#EEE',
  gray: '#A0A0A0',
  orange: '#FF8A00',
  pink: '#FF5BDB',

  mainFilter: 'invert(34%) sepia(44%) saturate(5088%) hue-rotate(211deg) brightness(99%) contrast(90%)',
  warningFilter: 'invert(16%) sepia(51%) saturate(7032%) hue-rotate(357deg) brightness(105%) contrast(108%)',
}

const font = {
  main: `'Noto Sans KR', 'Pretendard', sans-serif`,
}

const fontsize = {
  content: '14px',
  logo: '27px',
  title1: '24px',
  title2: '18px',
  title3: '16px',
  sub1: '14px',
  landingtitle: '60px',
}

const lineheight = {
  content: '24px',
  title1: '24px',
  title2: '18px',
  title3: '16px',
  sub1: '14px',
}

const shadow = {
  card: `0px 3px 3px 0px rgba(0, 0, 0, 0.03);`,
  // card: `0px 4px 4px 0px rgba(0, 0, 0, 0.05);`,
}

const Theme = {
  common,
  color,
  shadow,
  font,
  fontsize,
  lineheight,
}

export default Theme