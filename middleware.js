import { NextResponse } from 'next/server'; // Import NextResponse

export async function middleware(req) {
    // console.log("logs middleware");
    const url = req.nextUrl.clone();
    const accessToken = req.cookies.get('token');
    const refreshToken = req.cookies.get('refresh');

    console.log(accessToken)
    if (!accessToken?.value) {
        console.log("---access token --- ", accessToken);

        if (url.pathname === '/') {
            // return NextResponse.next();
        }

        // Redirect to localhost if running in a local development environment
        if (process.env.NODE_ENV === 'development') {
            url.hostname = 'localhost';
            url.port = '3000';
            url.pathname = '/'; // Redirect to the root
        } else {
            // Redirect to a different URL in production if needed
            url.hostname = 'your-production-domain.com'; // Adjust for production
            url.pathname = '/';
        }

        // return NextResponse.redirect(url);
    }




    try {
        // Call the API route for token verification
        // console.log(`${req.nextUrl.origin}/api/verify-token`)
        const url = `${req.nextUrl.protocol}//${req.nextUrl.hostname}/api/verify-token`;
        //  console.log("access token",accessToken)
    
        // console.log((url))
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken?.value}`,
            },
        });
        // console.log("====api -response===",res)

        if (!res.ok) {
            // console.log("what happened",accessToken?.value)
            // If the token is invalid or expired, handle refresh logic
            if (refreshToken?.value) {
                const refreshUrl = `${process.env.API_URL}/api/token/refresh/`; // Update API URL as needed
                const refreshRes = await fetch(refreshUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: refreshToken.value }),
                });

                if (refreshRes.ok) {
                    const data = await refreshRes.json();
                    console.log("---------accessing--new---token---",data)

                    const response = NextResponse.next();
                    response.cookies.set('token', data.access, { httpOnly: false });
                    return response;
                } else {
                    url.pathname = '/';
                    // return NextResponse.redirect(url);
                }
            } else {
                url.pathname = '/';
                // return NextResponse.redirect(url);
            }
        }

        return NextResponse.next();
    } catch (err) {
        console.log("---error ---", err);
        if (url.pathname === '/') {
            // return NextResponse.next();
          }
        url.pathname = '/';
        // return NextResponse.redirect(url);
    }


    return NextResponse.next();

}
