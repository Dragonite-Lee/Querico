export default function handler(요청, 응답) {
    const time = new Date()
    if (요청.method == 'GET') {
        응답.status(200).json(time)
    }
}