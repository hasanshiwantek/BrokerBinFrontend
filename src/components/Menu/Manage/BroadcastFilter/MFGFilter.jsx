import React, { useState } from 'react'
import { initialMFGs } from '../../../../data/services';
import css from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";

const MFGFilter = ({ onIncludedMFGsChange }) => {
    const [availableMFGs, setAvailableMFGs] = useState([...initialMFGs]);
    const [includedMFGs, setIncludedMFGs] = useState(["-ALL MFG's-"]);
    const [selectedAvailable, setSelectedAvailable] = useState([]);
    const [selectedIncluded, setSelectedIncluded] = useState([]);

    const handlesSelectChange = (setSelected, e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelected(selectedOptions);
    };

    const moveToLeft = () => {
        if (selectedIncluded.length > 0) {
            const newIncluded = includedMFGs.filter(mfg => !selectedIncluded.includes(mfg));
            const newAvailable = [...availableMFGs, ...selectedIncluded];
            setIncludedMFGs(newIncluded);
            setAvailableMFGs(newAvailable);
            setSelectedIncluded([]);  // Clear selection after move
            onIncludedMFGsChange(newIncluded);
        }
    };

    const moveToRight = () => {
        if (selectedAvailable.length > 0) {
            const newAvailable = availableMFGs.filter(mfg => !selectedAvailable.includes(mfg));
            const newIncluded = [...includedMFGs, ...selectedAvailable];
            setAvailableMFGs(newAvailable);
            setIncludedMFGs(newIncluded);
            setSelectedAvailable([]);  // Clear selection after move
            onIncludedMFGsChange(newIncluded);
        }
    };

    const reset = () => {
        setAvailableMFGs(initialMFGs);
        setIncludedMFGs(["-ALL MFG's-"]);
        setSelectedAvailable([]);
        setSelectedIncluded([]);
        //   onIncludedMFGsChange(["-ALL MFG's-"]);
    };



    




    return (
        <>
            <div>
                <h1>Include These MFG's</h1>
                <div className={css.mfgcontainer}>
                    <div>
                        <select multiple className={css.listBox} value={selectedIncluded} onChange={(e) => handlesSelectChange(setSelectedIncluded, e)}>
                            {includedMFGs.map((mfg, idx) => <option key={idx}>{mfg} 
                                 </option>)}
                        </select>
                    </div>
                    <div className={css.mfgbuttons}>
                        <p onClick={moveToLeft}>&gt;&gt;</p>
                        <p onClick={moveToRight}>&lt;&lt;</p>
                        <p onClick={reset}>Reset</p>
                    </div>
                    <div>

                        <select multiple className={css.listBox} value={selectedAvailable} onChange={(e) => handlesSelectChange(setSelectedAvailable, e)}>
                            {availableMFGs.map((mfg, idx) => <option key={idx}>{mfg}</option>)}
                        </select>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MFGFilter