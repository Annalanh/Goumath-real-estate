export function generateAddress(listAddress) {
    let address = ''
    let listAddressLength = listAddress.length

    for (let i = 0; i < listAddressLength; i++) {
        if (listAddress[i]) {
            address += listAddress[i]
            if (i === listAddressLength - 1) {
                address += "."
            } else {
                address += ', '
            }
        }

    }
    return address
}