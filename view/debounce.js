// 立即执行
function debounce(func, wait = 50, immediate = true) {
	let timer, context, args

	// 延迟执行函数
	const later = () => setTimeout(() => {
		// 执行完毕清空定时器
		timer = null

		if (!immediate) {
			func.apply(context, args)
			context = args = null
		}
	}, wait)

	// 返回每次实际调用的函数
	return function (...params) {
		if (!timer) {
			timer = later()
			// 如果立即执行，调用函数
			if (immediate) {
				func.apply(this, params)
			} else {
				context = this
				args = params
			}
		} else {
			clearTimeout(timer)
			timer = later()
		}
	}
}


// 简单版
function debounce(func, wait) {
	let timer = null

	return function (...args) {
		// 触发时间间隔 小于 wait只执行一次
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, wait);
	}
}