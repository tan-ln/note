const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([])
    }, 2000);
  })
}

doSearch()
async function doSearch () {
  const data = await getData()
  console.log(data)
}

console.log('同步执行')