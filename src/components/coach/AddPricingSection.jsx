import React, { useState } from 'react';
import { normalStylingInput, editStylingInput } from './../utils/variables';

const AddPricingSection = ({ isEditable, isDisabled, packages, onAddPackage, onRemovePackage, onUpdatePackage }) => {
    const [packageName, setPackageName] = useState('');
    const [packageAmount, setPackageAmount] = useState('');
    const [packageType, setPackageType] = useState('Personal');

    const handleAddPackage = () => {
        if (packageName && packageAmount) {
            const newPackage = `${packageName} for ${packageType} - Rs ${packageAmount}`;
            onAddPackage(newPackage);
            setPackageName('');
            setPackageAmount('');
        }
    };

    return (
        <>
            <div className="coachFaqs-flex">
                <div className="coachFaqs-leftPack">
                    <input
                        type="text"
                        className="package-input"
                        style={isEditable ? editStylingInput : normalStylingInput}
                        disabled={isDisabled}
                        placeholder="Enter Package Name"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                    />
                    <input
                        type="number"
                        style={isEditable ? editStylingInput : normalStylingInput}
                        disabled={isDisabled}
                        className="package-input"
                        placeholder="Enter Amount Only"
                        value={packageAmount}
                        onChange={(e) => setPackageAmount(e.target.value)}
                    />
                    <div>
                        <div>
                            <input
                                type="radio"
                                name="packageType"
                                id="personalRadio"
                                value="Personal"
                                checked={packageType === 'Personal'}
                                onChange={(e) => setPackageType(e.target.value)}
                            />
                            <label htmlFor="personalRadio">Personal</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="packageType"
                                id="groupRadio"
                                value="Group"
                                checked={packageType === 'Group'}
                                onChange={(e) => setPackageType(e.target.value)}
                            />
                            <label htmlFor="groupRadio">Group</label>
                        </div>
                    </div>
                    {isEditable ? (
                        <button type="button" className="convertToDeal" onClick={handleAddPackage}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    ) : (
                        <button disabled className="disabledBtn">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    )}
                </div>
            </div>

            <div className="package-box">
                {packages?.map((pkg, index) => (
                    <div key={index} className="coachFaqs-flex">
                        <div className="coachFaqs-left">
                            <input
                                type="text"
                                value={pkg}
                                onChange={(e) => onUpdatePackage(index, e.target.value)}
                                style={isEditable ? editStylingInput : normalStylingInput}
                                disabled={isDisabled}
                            />
                        </div>
                        {isEditable && (
                            <button type="button" className="deleteFaq" onClick={() => onRemovePackage(index)}>
                                <i className="fa-solid fa-minus"></i>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default AddPricingSection;
