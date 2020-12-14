/*
 * Author: Kookiat Suetrong
 */
class ThaiInput {
	constructor() {
		fetch('thai-01.txt')
		.then( r => r.text() )
		.then( d => this.ready(d) )

		this.list = new Set()

		this.all = document.getElementsByTagName('thai-input')
		for (var i in this.all) {
			if (this.all[i].style == null) continue
			this.all[i].contentEditable = true
			this.all[i].style.minHeight = '1rem'
			this.all[i].style.border = '1px solid #eee'
			this.all[i].style.transition = 'border .25s linear'
			this.all[i].style.fontSize = '1rem'
			this.all[i].style.margin = '2px 0'
			this.all[i].style.padding = '.4rem .5rem .4rem .5rem'
			this.all[i].style.boxShadow = '0 0 0.25rem #eee inset'
			this.all[i].style.display = 'block'
			this.all[i].style.outline = 'none'
			this.all[i].addEventListener('focus', e => this.focus(e))
			this.all[i].addEventListener('blur', e => this.blur(e))
		}
	}

	ready(data) {
		for (var i of data.split('\n')) {
			this.list.add(i)
		}
	}

	focus(e) {
		e.target.style.border = '1px solid #bbb'
	}

	blur(e) {
		e.target.style.border = '1px solid #eee'
		var s = e.target.innerText.split('\n')
		e.target.innerHTML = ''
		var data = [ ]
		for (var i in s) {
			var result = this.check(s[i])
			var t = ''
			for (var i = 0; i < result.valid.length; i++) {
				if (result.valid[i]) {
					t += result.token[i]
				} else {
					t += "<span style='color:red'>" +
							result.token[i] +
							"</span>"
				}
			}
			data.push(t)
		}
		e.target.innerHTML = data.join('<br>')
		e.target.value = e.target.innerText
		// console.log(e.target.value)
	}

	check(text) {
		var token = [ ]
		var valid = [ ]
		// console.log('- ' + text)
		var start = 0
		var error = ''
		while (start < text.length) {
			var longest = 0
			var buffer = ''
			for (var last = start; last < text.length; last++) {
				buffer += text[last]
				if (this.list.has(buffer)) {
					longest = last + 1
				}
			}
			if (longest == 0) {
				error += text[start]
				start++
			} else {
				if (error.length > 0) {
					token.push(error)
					valid.push(false)
					error = ''
				}
				buffer = text.substring(start, longest)
				token.push(buffer)
				valid.push(true)
				start = longest
			}
		}
		if (error.length > 0) {
			token.push(error)
			valid.push(false)
		}
		return {token, valid}
	}
}

new ThaiInput()
