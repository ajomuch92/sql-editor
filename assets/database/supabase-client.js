/* eslint-disable no-async-promise-executor */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lgfglixazjwhrktkbuqh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTI4ODUxMSwiZXhwIjoxOTQ0ODY0NTExfQ.m3mJfHPQkFOuBigG-fX1qQHKhis9POlet2NrIQR_Jho'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function executeQuery (tableName) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase.from(tableName).select('*')
    if (error) {
      reject(error)
    } else {
      const headers = data.length > 0 ? Object.keys(data[0]) : []
      resolve({ data, headers })
    }
  })
}
