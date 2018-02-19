//('https://''.com','.org','.net','.biz','.tech','.io')
const convertUrl = (body) => {
  let splitBody = body.split(' ');
  let newArr = splitBody.map((unit) => {
    if (unit.includes('.com')) {
      if (!(unit.includes('http'))) {
        return `<a href='https://${unit}' target='_blank'>${unit}</a>`;
      }
      return `<a href='${unit}'  target='_blank'>${unit}</a>`;
    }
    if (unit.includes('.org')) {
      if (!(unit.includes('http'))) {
        return `<a href='https://${unit}'  target='_blank'>${unit}</a>`;
      }
      return `<a href='${unit}'  target='_blank'>${unit}</a>`;
    }
    if (unit.includes('.net')) {
      if (!(unit.includes('http'))) {
        return `<a href='https://${unit}'  target='_blank'>${unit}</a>`;
      }
      return `<a href='${unit}'  target='_blank'>${unit}</a>`;
    }
    if (unit.includes('http://')) {
      return `<a href='${unit}'  target='_blank' target='_blank'>${unit}</a>`;
    }
    if (unit.includes('https://')) {
      return `<a href='${unit}'  target='_blank'>${unit}</a>`;
    }
    return unit;
  });
  return newArr.join(' ');
};


module.exports = convertUrl;