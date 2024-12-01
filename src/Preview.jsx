import React, { useEffect, useRef, useState } from 'react'
import './styles/Preview.css'
import { jsPDF } from "jspdf";
import deleteicon from './assets/delete-icon.svg'
import html2canvas from "html2canvas";
const Preview = (props) => {
    const printRef = useRef();

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let calculatedTotal = 0;

        props.entries.forEach(item => {
            calculatedTotal += item.net;
        });

        setTotal(calculatedTotal);
    }, [props.entries]);

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
        pdf.save("Purchase-Order.pdf");
    };


    return (
        <div style={{ borderTop: "1px solid black" }}>
            <div ref={printRef} className='preview-container'>
                <div className='spacer'></div>
                <div className='header'>
                    <div className='customer-details'>
                        <p>To,</p>
                        <p><b>{props.customer}</b></p>
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
                            <th>S.no</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>UOM</th>
                            <th>Rate</th>
                            <th>Net</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.entries.map((item, key) => {
                                return (
                                    <>
                                        <tr className='table-entry'>
                                            <td>{key + 1}</td>
                                            <td>{item.desc}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.uom}</td>
                                            <td>{item.rate}</td>
                                            <td>{item.net}</td>
                                            <td className='delete-button-cell'><button onClick={() => deleteEntry(key)} className='delete-button'><img style={{ width: "15px" }} src={deleteicon} alt="" /></button></td>
                                        </tr>

                                    </>
                                )
                            }
                            )
                        }
                        <tr>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td>Total</td>
                            <td>{total}</td>

                        </tr>
                        <tr>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td>CGST {props.taxes.CGST}%</td>
                            <td>{Math.round((total * (props.taxes.CGST / 100)).toFixed(2))}</td>

                        </tr>
                        <tr>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td>SGST {props.taxes.SGST}%</td>
                            <td>{Math.round((total * (props.taxes.SGST / 100)).toFixed(2))}</td>
                        </tr>
                        <tr>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td className='empty-cell'></td>
                            <td style={{ border: "2px solid" }}>Net value</td>
                            <td style={{ border: "2px solid" }}>{Math.round(total + total * (props.taxes.SGST / 100) + total * (props.taxes.CGST / 100))}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <button onClick={handlePrint}>Print</button>
            </div>
        </div>
    )
}

export default Preview
