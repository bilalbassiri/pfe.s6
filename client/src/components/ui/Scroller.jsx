import React from 'react';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const Scroller = ({ title }) => {
    return (
        <div className="scroll-horizontally">
            <button type="button" onClick={() => {
                const zone = document.getElementById('bc' + title);
                zone.scrollLeft -= zone.clientWidth;
            }}>
                <ArrowBackIosRoundedIcon />
            </button>
            <button type="button" onClick={() => {
                const zone = document.getElementById('bc' + title);
                zone.scrollLeft += zone.clientWidth;
            }}>
                <ArrowForwardIosRoundedIcon />
            </button>
        </div>
    )
}
export default Scroller;