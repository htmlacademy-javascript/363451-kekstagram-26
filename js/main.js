function getRandom (min, max)  {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  if (min < max) {
    const random = Math.round((Math.random() * (max - min)) + min);
    return random;  
  }

  return "Первое число не может быть больше второго"
}

console.log(getRandom (25, 20))

function checkStringLength (text, maxLength) {
  return (text.length <= maxLength);    
}

console.log(checkStringLength('Какой-то комментарий', 140))
