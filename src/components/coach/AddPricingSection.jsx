import React, { useState, useEffect, useRef } from 'react';
import { normalStylingInput, editStylingInput } from './../utils/variables';

const AddPricingSection = ({ isEditable, isDisabled, pack, onPackagesUpdate }) => {
    const [packages, setPackages] = useState(pack || []);
    const prevPackagesRef = useRef(pack || []);
    const [packageName, setPackageName] = useState('');
    const [packageAmount, setPackageAmount] = useState('');
    const [packageType, setPackageType] = useState('Personal');
    useEffect(() => {
        if (prevPackagesRef.current !== packages) {
            onPackagesUpdate(packages);
            prevPackagesRef.current = packages;
        }
    }, [packages, onPackagesUpdate]);

    const handleAddPackage = () => {
        if (packageName && packageAmount) {
            const newPackage = `${packageName} for ${packageType} - Rs ${packageAmount}`;
            setPackages([newPackage, ...packages]);
            setPackageName('');
            setPackageAmount('');
        }
    };

    const handleRemovePackage = (index) => {
        setPackages(packages.filter((_, i) => i !== index));
    };

    const handleUpdatePackage = (index, newValue) => {
        const updatedPackages = packages.map((pkg, i) => (i === index ? newValue : pkg));
        setPackages(updatedPackages);
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
                        placeholder="Enter Monthly Package Name"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                    />
                    <input
                        type="number"
                        style={isEditable ? editStylingInput : normalStylingInput}
                        disabled={isDisabled}
                        className="package-input"
                        placeholder="Enter Amount"
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
                                onChange={(e) => handleUpdatePackage(index, e.target.value)}
                                style={isEditable ? editStylingInput : normalStylingInput}
                                disabled={isDisabled}
                            />
                        </div>
                        {isEditable && (
                            <button type="button" className="deleteFaq" onClick={() => handleRemovePackage(index)}>
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
