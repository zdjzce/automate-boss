aconst { exec } = require('child_process')
const fs = require('fs')

exec(
  'npx asar list /Users/zdj/practice/automate-boss/dist/mac-arm64/automate-boss.app/Contents/Resources/app.asar',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`)
      return
    }

    fs.writeFile('test.txt', stdout, (err) => {
      if (err) throw err
      console.log('结果已被保存到 output.txt')
    })
  }
)
