buf = Buffer.from('hello world')

buf.readUInt8(1)

buf.toString('utf8', 2, 4)

buf.toString('base64')

//buf2 = Buffer.from('aGVsbG8gd29ybGQ=', 'base64')

//buf2.toString('hex')

buf.readUInt8(0)

buf.readUInt8(1)

buf.readUInt16LE(0)

buf.readUInt32LE(0)



buf.writeUInt8(97 ,0)

buf.toString()

buf.write('cool')


