import { NextRequest, NextResponse } from "next/server";

// Fetch your Alpha Vantage API key from environment variables
const ALPHA_VANTAGE_API_KEY = "4J3RKYRYF87BC59X";

export async function GET(req: NextRequest, res: NextResponse) {
    // Check if the API key is available
    if (!ALPHA_VANTAGE_API_KEY) {
        return NextResponse.json({message:"Alpha Vantage API key not provided."});
    }

    try {
        // Your API request logic using the Alpha Vantage API key
        // For example:
        const response = await fetch(`https://www.alphavantage.co/query?apikey=${ALPHA_VANTAGE_API_KEY}&function=TIME_SERIES_DAILY&symbol=AAPL&interval=5min`);
        const data = await response.json();
        
        // Return the response from Alpha Vantage
        return NextResponse.json(data);
    } catch (error) {
        // Handle errors
        console.error("Error fetching data from Alpha Vantage:", error);
        return NextResponse.json({message:"Error fetching data from Alpha Vantage."});
    }
}
