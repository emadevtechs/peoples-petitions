const baseRestUrl = "https://peoples-petition-node.herokuapp.com/api/v1/";

export const userUrls = (data) => ({
    list: baseRestUrl + 'users/'+ data.id + '/profile.json',
    create: baseRestUrl + 'users/',
    login: baseRestUrl + 'users/login',
})

export const postUrls = (data) => ({
    list: baseRestUrl + "posts/list/"+data,
    create: baseRestUrl + "posts/",
    byuser: baseRestUrl + "posts/by_user/"+data,
    bydis: baseRestUrl + "posts/by_district/"+data,
})

export const districtUrls = (data) => ({
    list: baseRestUrl + "districts",
    create: baseRestUrl + "posts/",
    login: baseRestUrl + 'districts/login',
})

export const friendUrls = (data) => ({
    list: baseRestUrl + "friends/"+data,
    find: baseRestUrl + "friends/find",
    addfrnd: baseRestUrl + "friends/addfrnd",
    removefrnd: baseRestUrl + "friends/removefrnd"
})
