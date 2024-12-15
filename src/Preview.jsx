import React, { useEffect, useRef, useState } from 'react'
import './styles/Preview.css'
import { jsPDF } from "jspdf";
import deleteicon from './assets/delete-icon.svg'
import html2canvas from "html2canvas";
const Preview = (props) => {
    const printRef = useRef();

    const [total, setTotal] = useState(0);
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const [packing, setPacking] = useState(0);
    const [cgst, setCgst] = useState(0);
    const [sgst, setSgst] = useState(0);
    const [net, setNet] = useState(0);
    useEffect(() => {
        let calculatedTotal = 0;

        props.entries.forEach(item => {
            calculatedTotal += item.net;
        });
        setTotal(calculatedTotal);
        let discount = Math.round(calculatedTotal * props.discount / 100)
        let temp_packing = Math.round((calculatedTotal - discount) * props.pf / 100);
        setPacking(temp_packing)
        setDiscountedTotal(discount);
        let temp_cgst = Math.round((calculatedTotal - discount + temp_packing) * props.taxes.CGST / 100)
        setCgst(temp_cgst);
        let temp_sgst = Math.round((calculatedTotal - discount + temp_packing) * props.taxes.SGST / 100)
        setSgst(temp_sgst)
        setNet(calculatedTotal + temp_cgst + temp_sgst + temp_packing - discount);

    }, [props.entries, props.discount]);
    const deleteEntry = (index) => {
        props.setEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
        console.log(props.entries)
    };


    const handlePrint = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const imageData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
        pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save();
    };


    return (
        <div >
            <div ref={printRef} className='preview-container'>

                <div className='spacer'></div>
                <div className='header'>
                    <div className='customer-details'>
                        <p>To,</p>
                        <p><b>{props.customer}</b></p>
                        <p>{props.place}</p>
                    </div>
                    <div className='purchase-details'>
                        <p>Purchase Order No : <b>{localStorage.getItem("Purchase-order")}</b></p>
                        <p>Date : <b>{localStorage.getItem("date")}</b></p>
                    </div>
                </div>
                <div className='preview-content'>
                    <p>Dear sir,</p>
                    <p style={{ textIndent: "50px" }}>Based on the details provided,
                        we are pleased to confirm our order for the
                        following items. We kindly request you to
                        arrange for their prompt delivery at the
                        earliest convenience.
                    </p>
                </div>
                <table className='Items-table'>
                    <thead>

                        <tr>
                            <th style={{width:"70px"}}>S.no</th>
                            <th>Description</th>
                            <th style={{width:"70px"}}>Qty</th>
                            <th style={{width:"70px"}}>UOM</th>
                            <th style={{width:"110px"}}>Rate</th>       
                            {props.entries.some((item) => item.disc != 0) &&
                                <>
                                    <th style={{width:"150px"}}>Discount %</th>
                                    <th style={{width:"120px"}}>Discount Amount</th>
                                </>

                            }
                            <th style={{width:"110px"}}>Net Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.entries.map((item, key) => {
                                return (
                                    <>
                                        <tr key={key} className='table-entry'>
                                            <td>{key + 1}</td>
                                            <td>{item.desc}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.uom}</td>
                                            <td>{item.rate}</td>
                                            {props.entries.some((i) => i.disc != 0) &&
                                                <>
                                                    <td>{item.disc}%</td>
                                                    <td>{Math.round((item.qty * item.rate) * item.disc / 100)}</td>
                                                </>
                                            }
                                            <td>{Math.round(item.net)}</td>
                                            <td className='delete-button-cell'><button onClick={() => deleteEntry(key)} className='delete-button'><img className='delete-icon' src={deleteicon} alt="" /></button></td>
                                        </tr>
                                    </>
                                )
                            }
                            )
                        }
                        <tr>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            {
                                props.entries.some((item) => item.disc != 0) &&
                                (
                                    <>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                    </>
                                )
                            }
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td>Total</td>
                            <td>{Math.round(total)}</td>
                        </tr>
                        {
                            props.pf != 0 ? (
                                <>
                                    <tr>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                        {
                                            props.entries.some((item) => item.disc != 0) &&
                                            (
                                                <>
                                                    <td className='empty-cell'></td>
                                                    <td className='empty-cell'></td>
                                                </>
                                            )
                                        }
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                        <td >P&F {props.pf}%</td>
                                        <td>{packing}</td>
                                        {console.log(packing)}
                                    </tr>
                                    <tr>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                        {
                                            props.entries.some((item) => item.disc != 0) &&
                                            (
                                                <>
                                                    <td className='empty-cell'></td>
                                                    <td className='empty-cell'></td>
                                                </>
                                            )
                                        }
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                        <td > <b>S.Total</b></td>
                                        <td>{total - discountedTotal + packing}</td>
                                    </tr>
                                </>
                            ) : (<></>)
                        }
                        {
                            props.discount != 0 ? (
                                <>
                                    <tr>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                        {
                                            props.entries.some((item) => item.disc != 0) &&
                                            (
                                                <>
                                                    <td className='empty-cell'></td>
                                                    <td className='empty-cell'></td>
                                                </>
                                            )
                                        }
                                        <td className='empty-cell'></td>
                                        <td >Discount {props.discount}%</td>
                                        <td>{discountedTotal}</td>
                                    </tr>
                                    <tr>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                        {
                                            props.entries.some((item) => item.disc != 0) &&
                                            (
                                                <>
                                                    <td className='empty-cell'></td>
                                                    <td className='empty-cell'></td>
                                                </>
                                            )
                                        }
                                        <td className='empty-cell'></td>
                                        <td > <b>S.Total</b></td>
                                        <td>{total - discountedTotal}</td>
                                    </tr>
                                </>
                            ) : (<></>)
                        }
                        <tr>
                            <td className='empty-cell'></td>
                            {
                                props.entries.some((item) => item.disc != 0) &&
                                (
                                    <>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                    </>
                                )
                            }
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td>CGST {props.taxes.CGST}%</td>
                            <td>{cgst}</td>

                        </tr>
                        <tr>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            {
                                props.entries.some((item) => item.disc != 0) &&
                                (
                                    <>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                    </>
                                )
                            }
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td>SGST {props.taxes.SGST}%</td>
                            <td>{sgst}</td>
                        </tr>
                        <tr>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            {
                                props.entries.some((item) => item.disc != 0) &&
                                (
                                    <>
                                        <td className='empty-cell'></td>
                                        <td className='empty-cell'></td>
                                    </>
                                )
                            }
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td style={{ border: "2px solid" }}> <b>Net value</b></td>
                            <td style={{ border: "2px solid" }}> <b>{Math.round(net)}</b></td>

                        </tr>
                    </tbody>
                </table>
                <div className='signature-container'>
                    <div className='signature-spacer'>
                        <p>
                            <b>
                                Transport : {props.transport}
                            </b>
                        </p>
                    </div>
                    <div className='signature'>
                        <b>
                            <p>For Selvaganapathy cotton mills (P) Ltd,. </p>
                            <br />
                            <br />
                            <p>Authorised Signatory</p>
                        </b>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <button onClick={handlePrint}>Print</button>
            </div>
        </div>
    )
}

export default Preview
