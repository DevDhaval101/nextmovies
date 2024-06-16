export async function GET(req,{params}){
    // console.log(params)

    const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${params.id}?language=en-US&api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`)

    const data = await res.json()

    // console.log("DATA",data)

    return Response.json(data)
}