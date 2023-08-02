import { json } from '@sveltejs/kit'
import sharp from 'sharp'

export const GET = async({url, fetch}) => {
    const imageUrl = url.searchParams.get('image')
    if(imageUrl){
        const image = await fetch(imageUrl).then(res => res.arrayBuffer());
        const stats = await sharp(Buffer.from(image)).stats();
        const [r,g,b] = stats.channels.map(c => c.mean)
        return json({color:`rgba(${r},${g},${b})`})
    }
    return json({color:null})
}