const { spawn } = require('child_process')
const request = require('request')

const dataKV = [
    {
        province: "Hà Nội",
        point: 10,
        kv: [
            { area: "KV1", code: 0.5, name: ["Ba Trại", "Ba Vì", "Khánh Thượng", "Minh Quang", "Tản Lĩnh", "Vân Hòa", "Yên Bài", "Tiến Xuân", "Yên Bình", "Yên Trung", "Đông Xuân", "Phú Mãn", "Trần Phú", "An Phú"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: ["Thanh Trì", "Gia Lâm", "Đông Anh", "Sóc Sơn", "Ba Vì", "Phúc Thọ", "Thạch Thất", "Quốc Oai", "Chương Mỹ", "Đan Phượng", "Hoài Đức", "Thanh Oai", "Mỹ Đức", "Ứng Hoà", "Thường Tín", "Phú Xuyên", "Mê Linh", "Sơn Tây"] },
            { area: "KV3", code: 2, name: ["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng", "Đống Đa", "Tây Hồ", "Cầu Giấy", "Thanh Xuân", "Hoàng Mai", "Long Biên", "Bắc Từ Liêm", "Hà Đông", "Nam Từ Liêm", "Từ Liêm"] },
        ]
    },
    {
        province: "Hồ Chí Minh",
        point: 10,
        kv: [
            { area: "KV1", code: 0.5, name: [] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: ["Bình Chánh", "Cần Giờ", "Củ Chi", "Hóc Môn", "Nhà Bè"] },
            { area: "KV3", code: 2, name: ["Quận 1", "Quận 2", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10", "Quận 11", "Quận 12", "Bình Thạnh", "Gò Vấp", "Phú Nhuận", "Tân Bình", "Thủ Đức", "Tân Phú", "Bình Tân"] },
        ]
    },
    {
        province: "Hải Phòng",
        point: 9,
        kv: [
            { area: "KV1", code: 0.5, name: ["Cát Hải"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: ["An Lão", "Kiến Thụy", "Thủy Nguyên", "An Dương", "Tiên Lãng", "Vĩnh Bảo", "Bạch Long Vĩ"] },
            { area: "KV3", code: 2, name: ["Hồng Bàng", "Lê Chân", "Ngô Quyền", "Kiến An", "Hải An", "Đồ Sơn", "Dương Kinh"] },
        ]
    },
    {
        province: "Đà Nẵng",
        point: 8,
        kv: [
            { area: "KV1", code: 0.5, name: ["Huyện đảo Hoàng Sa"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: ["Hòa Vang"] },
            { area: "KV3", code: 2, name: ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu", "Cẩm Lệ"] },
        ]
    },
    {
        province: "Thái Nguyên",
        point: 7,
        kv: [
            { area: "KV1", code: 0.5, name: ["Võ Nhai", "Định Hoá", "Đại Từ", "Phú Lương", "Đồng Hỷ"] },
            { area: "KV2-NT", code: 1, name: ["Phú Bình"] },
            { area: "KV2", code: 1.5, name: ["Sông Công", "Phổ Yên", "Thành phố Thái Nguyên"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Phú Thọ",
        point: 4,
        kv: [
            { area: "KV1", code: 0.5, name: ["Võ Nhai", "Định Hoá", "Đại Từ", "Phú Lương", "Đồng Hỷ"] },
            { area: "KV2-NT", code: 1, name: ["Thanh Ba", "Hạ Hòa", "Cẩm Khê", "Phù Ninh", "Lâm Thao", "Tam Nông", "Thanh Thủy"] },
            { area: "KV2", code: 1.5, name: ["Việt Trì"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Vĩnh Phúc",
        point: 7,
        kv: [
            { area: "KV1", code: 0.5, name: ["Tam Đảo"] },
            { area: "KV2-NT", code: 1, name: ["Yên Lạc", "Vĩnh Tường", "Tam Dương", "Sông Lô", "Lập Thạch", "Bình Xuyên"] },
            { area: "KV2", code: 1.5, name: ["Vĩnh Yên", "Phúc Yên"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Quảng Ninh",
        point: 9,
        kv: [
            { area: "KV1", code: 0.5, name: ["Ba Chẽ", "Bình Liêu", "Cô Tô", "Đại Yên", "Hà Khánh", "Hà Phong", "Hà Trung", "Việt Hưng", "Mông Dương", "Quang Hanh"] },
            { area: "KV2-NT", code: 1, name: ["Đầm Hà", "Hải Hà", "Tiên Yên", "Hoành Bồ", "Vân Đồn"] },
            { area: "KV2", code: 1.5, name: ["Hạ Long", "Cẩm Phả", "Uông Bí", "Móng Cái"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Bắc Giang",
        point: 5,
        kv: [
            { area: "KV1", code: 0.5, name: ["Sơn Động", "Lục Ngạn", "Lục Nam", "Yên Thế", "Tân Yên", "Yên Dũng"] },
            { area: "KV2-NT", code: 1, name: ["Hiệp Hòa", "Việt Yên", "Lạng Giang"] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Bắc Ninh",
        point: 8,
        kv: [
            { area: "KV1", code: 0.5, name: [] },
            { area: "KV2-NT", code: 1, name: ["Yên Phong", "Tiên Du", "Quế Võ", "Thuận Thành", "Gia Bình", "Lương Tài"] },
            { area: "KV2", code: 1.5, name: ["Từ Sơn", "Thành phố Bắc Ninh"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Hải Dương",
        point: 6,
        kv: [
            { area: "KV1", code: 0.5, name: ["Chí Linh", "Kinh Môn"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: ["Tân Bình", "Thanh Bình", "Ngọc Châu", "Nhị Châu", "Hải Tân", "Quang Trung", "Bình Hàn", "Cẩm Thượng", "Phạm Ngũ Lão", "Lê Thanh Nghị", "Nguyễn Trãi", "Trần Phú", "Trần Hưng Đạo", "Tứ Minh", "Việt Hoà", "Nam Đồng", "Ái Quốc", "An Châu", "Thượng Đạt", "Thạch Khôi", "Tân Hưng"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Hưng Yên",
        point: 5,
        kv: [
            { area: "KV1", code: 0.5, name: [] },
            { area: "KV2-NT", code: 1, name: ["Tiên Lữ", "Ân Thi", "Phù Cừ", "Mỹ Hào", "Yên Mỹ", "Kim Động", "Khoái Châu", "Văn Giang", "Văn Lâm"] },
            { area: "KV2", code: 1.5, name: ["Thành phố Hưng Yên"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Hà Nam",
        point: 6,
        kv: [
            { area: "KV1", code: 0.5, name: [] },
            { area: "KV2-NT", code: 1, name: ["Duy Tiên", "Kim Bảng", "Lý Nhân", "Thanh Liêm", "Bình Lục"] },
            { area: "KV2", code: 1.5, name: ["Thành phố Phủ Lý"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Nam Định",
        point: 6,
        kv: [
            { area: "KV1", code: 0.5, name: [] },
            { area: "KV2-NT", code: 1, name: ["Mỹ Lộc", "Vụ Bản", "Ý Yên", "Nam Trực", "Trực Ninh", "Xuân Trường", "Giao Thủy", "Hải Hậu", "Nghĩa Hưng"] },
            { area: "KV2", code: 1.5, name: ["Thành phố Nam Định"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Thái Bình",
        point: 4,
        kv: [
            { area: "KV1", code: 0.5, name: [] },
            { area: "KV2-NT", code: 1, name: ["Quỳnh Phụ", "Hưng Hà", "Đông Hưng", "Vũ Thư", "Kiến Xương", "Tiền Hải", "Thái Thụy"] },
            { area: "KV2", code: 1.5, name: ["Thành phố Thái Bình"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Ninh Bình",
        point: 5,
        kv: [
            { area: "KV1", code: 0.5, name: ["Tam Điệp", "Nho Quan"] },
            { area: "KV2-NT", code: 1, name: ["Gia Viễn", "Hoa Lư", "Yên Mô", "Kim Sơn", "Yên Khánh"] },
            { area: "KV2", code: 1.5, name: ["Thành phố Ninh Bình"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Thanh Hóa",
        point: 4,
        kv: [
            { area: "KV1", code: 0.5, name: ["Mường Lát", "Quan Sơn", "Quan Hóa", "Lang Chánh", "Bá Thước", "Cẩm Thủy", "Ngọc Lặc", "Thường Xuân", "Như Xuân", "Như Thanh", "Thạch Thành"] },
            { area: "KV2-NT", code: 1, name: ["Vĩnh Lộc", "Yên Định", "Thiệu Hóa", "Đông Sơn", "Triệu Sơn", "Thọ Xuân", "Nông Cống", "Tĩnh Gia", "Quảng Xương", "Hoằng Hóa", "Hậu Lộc", "Hà Trung", "Nga Sơn"] },
            { area: "KV2", code: 1.5, name: ["Thành phố Thanh Hóa", "Sầm Sơn", "Bỉm Sơn"] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    // Khu vực núi
    {
        province: "Hà Giang",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Bắc Mê", "Bắc Quang", "Đồng Văn", "Hoang Su Phì", "Mèo Vạc", "Quản Bạ", "Quang Bình", "Vị Xuyên", "Xín Mần", "Yên Minh"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Cao Bằng",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Bảo Lạc", "Bảo Lâm", "Hạ Lang", "Hà Quảng", "Hòa An", "Nguyên Bình", "Quảng Hòa", "Thạch An", "Trùng Khánh"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Lai Châu",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Mường Tè", "Sìn Hồ", "Nậm Nhùn", "Tam Đường", "Phong Thổ", "Tân Uyên", "Than Uyên"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Lào Cai",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Bắc Hà", "Bảo Thắng", "Bảo Yên", "Bát Xát", "Mường Khương", "Sa Pa", "Than Uyên", "Văn Bàn"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Tuyên Quang",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Chiêm Hóa", "Hàm Yên", "Na Hang", "Sơn Dương", "Yên Sơn"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Lạng Sơn",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Bằng Mạc", "Bắc Sơn", "Bình Gia", "Cao Lộc", "Điềm He", "Lộc Bình", "Ôn Châu", "Thoát Lãng", "Tràng Định", "Văn Uyên"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Bắc Kạn",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Ba Bể", "Bạch Thông", "Chợ Đồn", "Chợ Mới", "Na Rì", "Ngân Sơn", "Pác Nặm"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Yên Bái",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Lục Yên", "Mù Cang Chải", "Trạm Tấu", "Trấn Yên", "Văn Chấn", "Văn Yên", "Yên Bình"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Sơn La",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Bắc Yên", "Mai Sơn", "Mộc Châu", "Mường La", "Phù Yên", "Quỳnh Nhai", "Sông Mã", "Thuận Châu", "Yên Châu"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Hòa Bình",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Đà Bắc", "Mai Châu", "Lương Sơn", "Kỳ Sơn", "Lạc Sơn", "Lạc Thủy", "Kim Bôi", "Tân Lạc", "Yên Thủy"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Đắk Lắk",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Buôn Đôn", "Cư M'gar", "Ea H'leo", "Ea Kar", "Ea Súp", "Krông Ana", "Krông Bông", "Krông Búk", "Krông Năng", "Krông Pắk", "Lắk", "M'Đrắk"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Lâm Đồng",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Bảo Lộc", "Di Linh", "Đơn Dương", "Đức Trọng"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Điện Biên",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Mường Nhé", "Mường Chà", "Tủa Chùa", "Tuần Giáo", "Mường Lay"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
    {
        province: "Đăk Nông",
        point: 2,
        kv: [
            { area: "KV1", code: 0.5, name: ["Cư Jút", "Đắk Glong", "Đắk Mil", "Đắk R'lấp", "Đắk Song", "Krông Nô", "Tuy Đức"] },
            { area: "KV2-NT", code: 1, name: [] },
            { area: "KV2", code: 1.5, name: [] },
            { area: "KV3", code: 2, name: [] },
        ]
    },
]

function calcPoint({ region, county }) {
    let placePoint;
    dataKV.forEach(d => {
        if (d.province === region.trim()) {
            placePoint = d.point
            d.kv.forEach(k => {
                k.name.forEach(n => {
                    if (n === county.trim()) {
                        placePoint = placePoint * (k.code)
                    }
                })
            })
        }
    })
    return placePoint;
}

function geoCoding({ lat, lon }) {
    return new Promise((res, rej) => {
        request(`https://apis.wemap.asia/we-tools/pip/${lon}/${lat}?key=vpstPRxkBBTLaZkOaCfAHlqXtCR`, (err, header, body) => {
            if (err) rej(err)
            else {
                try {
                    let result = JSON.parse(body)
                    res({ region: result.region[0].name, county: result.county[0].name })
                } catch (e) {
                    rej(e)
                }
            }
        })
    })
}
function countUtilites({ lat, lon }) {
    return new Promise((resolve, reject) => {
        request(`http://localhost:8081/utility/all-predict?lon=${lon}&lat=${lat}&radius=1`, (error, header, body) => {
            if (error) {
                reject(error)
            }
            else {
                try {
                    let result = JSON.parse(body)
                    let utilityCounts = {}
                    result.forEach(res => {
                        utilityCounts[res.type] = res.point.length
                    })
                    resolve(utilityCounts)
                } catch (e) {
                    reject(e)
                }
            }
        })
    })

}
class PredictController {
    async predict(req, res) {
        const { area, num_bedroom, num_bathroom, lat, lon } = req.query
        const { region, county } = await geoCoding({ lat, lon });
        const point = calcPoint({ region, county });
        const utilityCounts = await countUtilites({ lat, lon })
        const childProcess = spawn('python3', ['./training-code/predict-price.py', area, num_bedroom, num_bathroom, utilityCounts.bank, utilityCounts.cafe, utilityCounts.college, utilityCounts.hospital, utilityCounts.marketplace, utilityCounts.parking, utilityCounts.school, utilityCounts.university, point])
        let predictedPrice;
        childProcess.stdout.on('data', (data) => {
            predictedPrice = data.toString()
        })
        childProcess.stderr.on('data', function (data) {
            console.log('stderr:' + data)
        })
        childProcess.on('close', (code) => {
            res.send(predictedPrice)
        })

    }
}

module.exports = new PredictController()
