
export default function Header(){
    return (
        <>
            <header className="bg-dark-mode m-auto border-b border-gray-100 p-2">
                <div className="header-mobile flex justify-between">
                    <div className="header-menu">
                        <button className="btn-menu bg-transparent border-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path className="fill-primary" d="M3.60001 18H20.4V15.6H3.60001V18ZM3.60001 6V8.4H20.4V6H3.60001ZM3.60001 13.2H20.4V10.8H3.60001V13.2Z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="user-option">
                        <button className="bg-transparent border-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.1064 16.3392L19.0594 12.5599V8.625C19.0594 4.69627 15.8631 1.5 11.9344 1.5C8.00564 1.5 4.80937 4.69627 4.80937 8.625V12.5599L2.76225 16.3391C2.66941 16.5105 2.62269 16.703 2.62665 16.8979C2.63062 17.0927 2.68514 17.2832 2.78486 17.4507C2.88459 17.6181 3.02611 17.7568 3.19556 17.8531C3.365 17.9494 3.55655 18 3.75145 18H7.82653C7.81516 18.1247 7.80942 18.2498 7.80932 18.375C7.80932 19.469 8.24392 20.5182 9.01751 21.2918C9.7911 22.0654 10.8403 22.5 11.9343 22.5C13.0283 22.5 14.0776 22.0654 14.8511 21.2918C15.6247 20.5182 16.0593 19.469 16.0593 18.375C16.0593 18.2484 16.0533 18.1236 16.0421 18H20.1172C20.3121 18 20.5036 17.9493 20.673 17.853C20.8424 17.7567 20.9839 17.6181 21.0836 17.4506C21.1834 17.2832 21.2379 17.0927 21.2418 16.8979C21.2458 16.7031 21.1991 16.5105 21.1063 16.3392H21.1064ZM14.5594 18.375C14.5597 18.7357 14.4856 19.0927 14.3418 19.4235C14.198 19.7543 13.9876 20.052 13.7236 20.2979C13.4597 20.5438 13.1478 20.7326 12.8077 20.8526C12.4675 20.9726 12.1062 21.0212 11.7464 20.9954C11.3866 20.9696 11.0359 20.8698 10.7164 20.7025C10.3968 20.5351 10.1152 20.3036 9.88908 20.0226C9.66296 19.7415 9.4972 19.4168 9.40214 19.0688C9.30709 18.7208 9.28478 18.357 9.33661 18H14.5321C14.5501 18.1242 14.5592 18.2495 14.5594 18.375ZM4.38103 16.5L6.30937 12.9401V8.625C6.30937 7.13316 6.902 5.70242 7.9569 4.64752C9.01179 3.59263 10.4425 3 11.9344 3C13.4262 3 14.857 3.59263 15.9118 4.64752C16.9667 5.70242 17.5594 7.13316 17.5594 8.625V12.9401L19.4876 16.5H4.38103Z" className="fill-secondary"/>
                            </svg>
                        </button>

                        <button className="bg-transparent border-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M22.1401 7.43127C21.6142 6.17625 20.8492 5.03553 19.8877 4.07268C18.9291 3.10815 17.7903 2.34129 16.5361 1.81565C15.2513 1.27455 13.8709 0.997182 12.4768 1.00002H12.4299C11.0119 1.00705 9.64083 1.2883 8.34943 1.84143C7.106 2.37246 5.97795 3.14068 5.02833 4.10315C4.07614 5.06384 3.31991 6.20057 2.80177 7.45002C2.26391 8.74931 1.99138 10.1431 2.00021 11.5492C2.00724 13.1758 2.3963 14.7906 3.12286 16.2344V19.7969C3.12286 20.3922 3.60568 20.875 4.19865 20.875H7.75646C9.20694 21.6069 10.8076 21.9921 12.4322 22H12.4815C13.883 22 15.2401 21.7281 16.5197 21.1961C17.7676 20.6767 18.9021 19.9188 19.8596 18.9649C20.8252 18.0063 21.5846 16.886 22.1166 15.6367C22.6674 14.343 22.9486 12.9672 22.9557 11.5469C22.9604 10.1196 22.6838 8.7344 22.1401 7.43127ZM7.79865 12.625C7.17989 12.625 6.67599 12.1211 6.67599 11.5C6.67599 10.8789 7.17989 10.375 7.79865 10.375C8.4174 10.375 8.9213 10.8789 8.9213 11.5C8.9213 12.1211 8.41974 12.625 7.79865 12.625ZM12.4768 12.625C11.858 12.625 11.3541 12.1211 11.3541 11.5C11.3541 10.8789 11.858 10.375 12.4768 10.375C13.0955 10.375 13.5994 10.8789 13.5994 11.5C13.5994 12.1211 13.0955 12.625 12.4768 12.625ZM17.1549 12.625C16.5361 12.625 16.0322 12.1211 16.0322 11.5C16.0322 10.8789 16.5361 10.375 17.1549 10.375C17.7736 10.375 18.2776 10.8789 18.2776 11.5C18.2776 12.1211 17.7736 12.625 17.1549 12.625Z" className="fill-secondary"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}