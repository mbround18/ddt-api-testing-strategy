/**
 * Return data after the chaos monkey has had fun with it.
 * In a different application, this would be tweaked to suit the application development needs. 
 */
export function chaosMonkey(data: object) {
  const modifiedData = data;
  Object.keys(modifiedData).forEach(key => {
        switch (typeof modifiedData[key]) {
          case 'string':
            modifiedData[key] = '!@#$%^&*()_)(*&*()\'[]\\`~'
          case 'number':
            modifiedData[key] = 987654321234567890 * 999
          default:
            return;
        }
  })
  return modifiedData;
}