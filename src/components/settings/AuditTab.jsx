import React from 'react'

const AuditTab = () => {
    return (
        <div className='audit-table'>
            <table>
                <thead>
                    <tr>
                        <th className='common-fonts'>NAME</th>
                        <th className='common-fonts'>FEATURE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='common-fonts'>Company</td>
                        <td>
                            <div>
                                <label className="password-switch">
                                    <input
                                        type="checkbox"
                                    />
                                    <span className="password-slider password-round"></span>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='common-fonts'>Leads</td>
                        <td>
                        <div>
                                <label className="password-switch">
                                    <input
                                        type="checkbox"
                                    />
                                    <span className="password-slider password-round"></span>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='common-fonts'>Deals</td>
                        <td>
                        <div>
                                <label className="password-switch">
                                    <input
                                        type="checkbox"
                                    />
                                    <span className="password-slider password-round"></span>
                                </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AuditTab