const request = require('request')
const API_KEY = 'vpstPRxkBBTLaZkOaCfAHlqXtCR';
const utilities = [
    { type: 'hospital', k: 'amenity', v: 'hospital' },
    { type: 'university', k: 'amenity', v: 'university' },
    { type: 'medical_supply', k: 'shop', v: 'medical_supply' },
    { type: 'pharmacy', k: 'amenity', v: 'pharmacy' },
    { type: 'veterinary', k: 'amenity', v: 'veterinary' },
    { type: 'kindergarten', k: 'amenity', v: 'childcare' },
    { type: 'school', k: 'amenity', v: 'school' },
    { type: 'college', k: 'amenity', v: 'college' },
    { type: 'language_school', k: 'amenity', v: 'language_school' },
    { type: 'music_school', k: 'amenity', v: 'music_school' },
    { type: 'mall', k: 'shop', v: 'mall' },
    { type: 'supermarket', k: 'shop', v: 'supermarket' },
    { type: 'bank', k: 'amenity', v: 'bank' },
    { type: 'cafe', k: 'amenity', v: 'cafe' },
    { type: 'marketplace', k: 'amenity', v: 'marketplace' },
    { type: 'parking', k: 'amenity', v: 'parking' },
    { type: 'bus_station', k: 'amenity', v: 'bus_station' },
    { type: 'police', k: 'amenity', v: 'police' },
];
function getUtility(type) {
    return utilities.filter(utility => utility.type == type)[0]
}
function getOne(utility, lat, lon, radius) {
    if(radius < 100) radius = radius*1000
    return new Promise((resolve, reject) => {
        request(`https://apis.wemap.asia/we-tools/explore?lat=${lat}&lon=${lon}&k=${utility.k}&v=${utility.v}&d=${radius}&key=${API_KEY}&type=raw&limit=100`, (error, header, body) => {
            if (error) {
                reject(error)
            }
            else {
                try {
                    let result = JSON.parse(body)
                    resolve(result)
                } catch (e) {
                    reject(e)
                }
            }
        })
    })
}
class UtilityController {
    getAllUtilities(req, res) {
        let { checkedTypes, lat, lon, radius } = req.body
        let arr = []
        checkedTypes.forEach((val) => {
            arr.push(getOne(getUtility(val), lat, lon, radius))
        })
        Promise.all(arr).then((docs) => {
            let result = []
            docs.forEach((doc, index) => {
                result.push({ type: checkedTypes[index], point: docs[index] })
            })
            res.send(result)
        }).catch(() => { res.send([]) })
    }
    getAllUtilitiesPredict(req, res) {
        let { lat, lon, radius } = req.query
        let checkedTypes = ["hospital", "university", "medical_supply", "pharmacy", "school", "college", "cafe", "bus_station", "police", "bank", "marketplace"]
        let arr = []
        checkedTypes.forEach((val) => {
            arr.push(getOne(getUtility(val), lat, lon, Number(radius)))
        })
        Promise.all(arr).then((docs) => {
            let result = []
            docs.forEach((doc, index) => {
                result.push({ type: checkedTypes[index], point: docs[index] })
            })
            res.send(result)
        }).catch((e) => {res.send([]) })
    }
    async getOneUtility(req, res) {
        try {
            const rs = await getOne(getUtility(req.query.type), req.query.lat, req.query.lon, req.query.radius)
            res.send(rs)
        } catch (error) {
            res.send([])
        }
    }
}
module.exports = new UtilityController()

