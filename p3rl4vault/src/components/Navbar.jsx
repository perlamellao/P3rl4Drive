import React, { useState } from 'react'
import { delete_cookie, bake_cookie } from 'sfcookies'
import './Navbar.css'

function Navbar() {
    const [toggleNav, togNav] = useState("false")
    const handleToggle = () => {
        togNav(!toggleNav)
    }
    const logout = () => {
        delete_cookie('session_id')
        bake_cookie('session_id', 'CLOSED_SESSION')
        window.location.reload(false)
    }
    return (
        <div>
            <header className={toggleNav ? "header" : "header body-pd"} id="header">
                <div className="header_toggle"> <i onClick={handleToggle} className={toggleNav ? "bx bx-menu" : "bx bx-x"} id="header-toggle" /> </div>
                <form className="d-flex upload_button">
                    <button className="btn" type="submit">Subir Archivos</button>
                </form>

                <div className="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt="" /> </div>
            </header>
            <div className={toggleNav ? "l-navbar" : "l-navbar show"} id="nav-bar">
                <nav className="nav">
                    <div> 
                        <a className="nav_logo" href="/#">
                            <svg className="nav_logo-icon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="4000.000000pt" height="4000.000000pt" viewBox="0 0 4000.000000 4000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(-1000.000000,4000.000000) scale(0.100000,-0.100000)" fill="#fff" stroke="none">
                                <path d="M18044 32181 l-1597 -2131 -239 -2 -240 -3 122 -152 c80 -100 119 -157 114 -165 -5 -7 -1209 -1615 -2677 -3573 l-2668 -3560 -235 -3 c-177 -2 -234 -5 -234 -15 0 -6 -7 -156 -16 -331 l-16 -319 -125 -166 c-94 -126 -130 -166 -146 -166 -24 0 -35 -17 -36 -54 -1 -13 -26 -58 -57 -99 l-56 -74 51 -52 51 -52 -45 -894 c-25 -492 -44 -917 -43 -944 l3 -48 138 -55 139 -56 -7 -81 c-3 -44 -37 -731 -75 -1526 -38 -795 -72 -1482 -75 -1527 l-6 -83 318 0 c299 0 5184 -57 5341 -63 61 -2 -262 -62 -2043 -382 -1163 -209 -2115 -382 -2115 -385 0 -4 221 -131 491 -284 l490 -278 1837 6 c1010 3 2080 9 2377 12 l540 5 80 -72 c119 -107 966 -875 1299 -1178 160 -145 354 -321 430 -390 77 -69 227 -206 335 -304 107 -97 198 -176 202 -175 4 2 96 84 205 183 109 99 243 221 298 271 56 50 232 210 392 355 160 145 452 410 649 589 197 179 451 409 564 512 l206 187 2488 1 2489 0 525 297 c422 239 520 299 501 303 -12 4 -924 168 -2025 366 -1101 197 -2001 360 -2000 361 1 0 1231 16 2732 34 1502 18 2732 34 2734 35 2 2 -11 316 -29 698 -17 382 -30 700 -28 705 1 5 72 -17 156 -50 84 -32 156 -59 160 -59 4 0 4 60 1 132 -4 73 -29 586 -55 1141 l-48 1007 -146 56 c-80 31 -148 60 -152 63 -4 3 -23 332 -42 731 l-35 725 85 80 84 80 -72 95 c-120 160 -115 148 -121 292 -3 71 -9 132 -12 138 -3 5 -50 10 -103 11 l-97 0 -880 1176 c-484 647 -1569 2095 -2411 3218 -842 1123 -1534 2048 -1538 2054 -5 7 -7 76 -7 154 3 428 -158 819 -453 1094 -170 160 -470 318 -741 392 -38 11 -60 38 -397 489 -1391 1859 -2870 3828 -2878 3830 -5 2 -728 -955 -1606 -2127z m1616 -10 c0 -4 31 -48 68 -97 37 -49 146 -192 242 -319 95 -126 228 -302 295 -390 67 -88 314 -414 550 -725 235 -311 432 -571 438 -577 7 -10 -74 -13 -400 -13 l-410 0 -224 296 c-123 163 -301 398 -395 523 -94 124 -176 226 -182 226 -9 0 -281 -356 -691 -902 l-106 -142 -412 -1 -412 0 134 178 c75 97 193 254 264 347 71 94 223 294 337 445 115 152 360 474 544 718 296 390 360 467 360 433z m2845 -2901 c354 -28 639 -182 759 -410 55 -105 78 -204 78 -340 0 -72 -6 -141 -16 -185 -26 -111 -985 -3663 -1008 -3735 -68 -211 -213 -397 -412 -525 -154 -99 -270 -149 -446 -193 l-105 -26 -1277 -3 -1277 -4 -11 -37 c-6 -20 -82 -302 -169 -627 l-158 -590 -792 -3 c-435 -1 -791 0 -791 3 0 3 340 1280 756 2839 l756 2834 -401 499 c-221 274 -401 501 -401 506 0 11 4772 8 4915 -3z m-5384 -660 c266 -328 312 -386 316 -397 3 -8 -26 -55 -65 -106 -38 -50 -141 -186 -228 -302 -88 -115 -277 -365 -420 -555 -144 -190 -321 -424 -394 -520 -73 -96 -211 -278 -306 -405 -96 -126 -247 -327 -337 -445 -89 -118 -248 -327 -352 -465 -287 -380 -475 -628 -745 -985 -136 -179 -331 -437 -435 -575 -104 -137 -236 -313 -295 -390 -58 -77 -231 -305 -384 -507 l-277 -368 -411 0 -410 0 15 23 c8 12 52 73 98 134 46 61 140 187 209 279 164 221 414 554 510 679 42 55 160 210 262 345 102 135 247 326 322 425 75 99 194 257 265 350 71 94 319 420 550 725 232 305 478 631 549 723 70 93 181 240 247 327 66 87 179 235 250 330 72 94 233 308 359 473 126 166 312 412 414 547 475 627 594 782 597 778 1 -2 45 -55 96 -118z m6834 -2110 c220 -292 293 -388 716 -947 258 -340 806 -1062 999 -1316 63 -84 207 -273 320 -422 112 -148 238 -315 280 -370 408 -536 640 -844 640 -849 0 -3 -186 -6 -412 -6 l-413 0 -46 63 c-26 34 -171 226 -323 427 -152 201 -348 460 -435 575 -87 116 -245 325 -351 465 -107 140 -333 440 -504 665 -170 226 -364 482 -431 570 -414 546 -494 656 -490 667 5 14 90 323 161 588 55 202 53 195 64 184 5 -5 106 -137 225 -294z m-7255 -1565 c-375 -1411 -442 -1660 -452 -1679 -6 -11 -117 -166 -246 -343 l-235 -323 -524 0 c-502 0 -524 1 -511 18 7 10 112 147 233 306 121 158 284 372 363 474 78 103 165 216 192 252 28 36 179 235 338 442 732 960 937 1227 938 1225 1 -1 -42 -168 -96 -372z m6607 -697 c103 -135 254 -333 336 -440 81 -106 245 -321 365 -478 119 -157 269 -352 331 -435 63 -82 143 -187 179 -232 l64 -83 -525 0 -524 0 -198 273 c-109 149 -233 319 -274 376 -42 57 -103 140 -135 185 -33 44 -89 122 -126 171 -36 50 -76 104 -88 121 l-22 32 57 68 c158 193 255 385 349 693 6 19 -6 33 211 -251z m3958 -2105 l173 -228 -170 -3 c-94 -1 -172 -1 -173 0 -6 8 -16 472 -10 466 4 -4 85 -110 180 -235z m-13065 -260 c1 -91 -103 -3408 -106 -3412 -4 -4 -122 42 -1313 511 -404 158 -737 286 -740 282 -5 -5 -109 -2322 -110 -2471 l-1 -63 -580 0 c-319 0 -580 1 -580 3 0 1 32 646 70 1432 38 787 70 1433 70 1438 0 4 62 7 138 8 90 0 130 3 117 9 -11 5 -136 55 -278 111 l-258 101 5 36 c3 21 13 207 22 415 10 207 21 377 26 377 5 0 67 -23 140 -50 72 -28 132 -49 133 -48 2 2 17 307 35 678 17 371 33 681 35 688 4 9 330 12 1590 12 l1585 0 0 -57z m3567 -615 c-4 -370 -10 -869 -14 -1108 l-6 -436 -259 -99 c-143 -55 -261 -102 -263 -105 -2 -3 113 -50 256 -105 l259 -100 -1 -235 c0 -186 -26 -2338 -28 -2347 -1 -2 -737 -3 -1637 -3 l-1635 0 6 148 c6 160 35 1120 35 1183 l0 39 575 0 576 0 -7 -305 -7 -305 475 0 475 0 6 298 c4 163 10 453 13 645 l7 347 160 0 c93 0 157 4 152 9 -8 7 -685 276 -1091 434 l-101 39 4 246 c3 136 6 252 8 257 1 6 203 88 448 184 l445 173 6 487 c3 267 8 503 10 524 l4 37 -1035 0 -1036 0 7 108 c3 59 9 229 12 377 4 149 8 273 11 278 2 4 718 7 1590 7 l1586 0 -6 -672z m3577 620 c3 -29 8 -519 11 -1088 l6 -1035 -265 -100 c-146 -55 -266 -103 -266 -106 0 -3 119 -51 264 -108 l264 -103 6 -106 c3 -59 9 -648 12 -1309 l6 -1203 -574 0 -575 0 -6 698 c-4 383 -7 844 -7 1024 l0 328 168 2 c110 2 160 6 147 12 -39 18 -1249 485 -1251 483 -1 -1 -5 -575 -9 -1274 l-8 -1273 -579 0 -580 0 6 273 c4 149 16 1316 27 2592 11 1276 22 2326 25 2333 3 9 329 12 1588 12 l1585 0 5 -52z m1511 40 c3 -7 18 -881 34 -1943 17 -1061 33 -2057 37 -2212 l6 -283 474 0 474 0 0 83 c0 45 -5 275 -10 511 -6 236 -9 431 -6 433 4 4 1144 -422 1152 -430 2 -1 11 -307 21 -680 l18 -677 -1637 0 -1638 0 -1 318 c0 174 -10 1343 -23 2597 -13 1254 -21 2283 -19 2288 2 4 254 7 559 7 435 0 556 -3 559 -12z m3569 4 c3 -5 19 -415 37 -913 17 -497 32 -904 33 -905 6 -3 961 -371 962 -370 1 0 -11 309 -27 686 -15 377 -28 713 -29 748 l0 62 565 0 565 0 0 -62 c2 -177 88 -1870 96 -1878 5 -5 72 -33 149 -63 l140 -55 7 -48 c9 -65 41 -775 35 -780 -3 -3 -74 22 -158 54 l-154 60 -3 -38 c-3 -33 60 -1463 72 -1637 l4 -63 -578 0 -578 0 -6 103 c-9 139 -76 1837 -76 1909 l0 57 135 3 135 3 -143 54 c-460 173 -2223 854 -2231 861 -8 8 -77 2198 -69 2213 6 10 1111 9 1117 -1z m-6424 -7251 c0 -11 -63 -72 -167 -162 -93 -79 -169 -147 -171 -151 -7 -15 -33 -8 -60 17 -15 14 -100 87 -189 163 -89 75 -162 140 -162 145 -1 4 168 7 374 7 359 0 375 -1 375 -19z"/>
                                <path d="M19911 27998 c-10 -32 -763 -2826 -777 -2880 l-6 -28 870 0 871 0 15 53 c16 56 760 2814 771 2860 l7 27 -870 0 -870 0 -11 -32z"/>
                                <path d="M12119 21158 c-2 -6 -47 -1053 -46 -1054 12 -7 921 -363 923 -361 1 1 11 263 23 582 12 319 24 637 28 708 l6 127 -467 0 c-256 0 -466 -1 -467 -2z"/>
                                <path d="M19287 20843 c-4 -174 -7 -409 -7 -523 l0 -207 453 -176 c248 -97 460 -179 470 -183 16 -6 17 32 17 700 l0 706 -463 0 -464 0 -6 -317z"/>
                                </g>
                            </svg>
                            <span className="nav_logo-name">P3rl4Drive</span>
                        </a>
                        <div className="nav_list"> 
                            <a href="/#" className="nav_link"> 
                                <i className="bx bx-grid-alt nav_icon" /> 
                                <span className="nav_name">Ajustes</span>
                            </a> 
                            <a href="/#" className="nav_link">
                                <i className="bx bx-message-square-detail nav_icon" />
                                <span className="nav_name">Mensajes</span>
                            </a>
                            <a href="/files" className="nav_link">
                                <i className="bx bx-folder nav_icon" />
                                <span className="nav_name">Archivos</span>
                            </a>
                            <a href="/#" className="nav_link">
                                <i className="bx bx-bar-chart-alt-2 nav_icon" />
                                <span className="nav_name">Estatus</span>
                            </a>
                        </div>
                    </div> 
                    <a href="/#" onClick={logout} className="nav_link"> <i className="bx bx-log-out nav_icon" /> <span className="nav_name">Cerrar Sesion</span> </a>
                </nav>
            </div>
        </div>
    )
}

export default Navbar