const machineIds = {
    get: () => JSON.parse(sessionStorage.getItem('mcids')),
    set: (data) => sessionStorage.setItem('mcids', JSON.stringify(data)),
}

export const machineStorageService = {
    machineIds,
}
