const db = require('./../dbConfig.js')

module.exports = async function(call) {
	const sessionKey = call.metadata.get("sessionkey")[0];
	
	if(sessionKey){

		await db.deleteOldSessions()
		const sessions = await db.getSessions(sessionKey) 
		if(sessions.rows.length>0){
			return {
				success:true,
				data: {
					userid: sessions.rows[0].userid
				}
			}
		} else {
			return {
				success: false,
				data:'please give a valid sessionkey!'
			}
		}
	} else {
		return {
			success: false,
			data: "you didn't give a sessionkey!"
		}
	}
}