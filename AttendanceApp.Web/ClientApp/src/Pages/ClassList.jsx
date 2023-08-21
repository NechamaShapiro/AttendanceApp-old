import React from 'react';

class ClassList extends React.Component {

    render() {
        return (
            <div className='container mt-5 mb-5'>
                <a href="pages/administrator">Administrator</a>
                <div className='border border-secondary rounded-pill' style={{ textAlign: 'center', padding: '5px', backgroundColor: 'rgb(240, 240, 240)' }}>
                    <h6><strong>Teacher:</strong> Mrs. Shapiro</h6>
                    <h6><strong>Subject:</strong> Math</h6>
                    <h6><strong>Grade:</strong>10</h6>
                </div>
                <br></br>
                <div style={{ textAlign: 'center', padding: '5px' }}>
                    <p style={{marginBottom: '5px'}}>
                        Date:
                        <input type="date"></input>
                    </p>
                    <p style={{marginBottom: '5px'}}>
                        Period:
                        <input type='number' min={1} max={10}></input>
                    </p>
                        <button className='btn btn-dark btn-sm'>Load List</button>
                </div>
                <br></br>
                <form>
                    <table className='table table-bordered'>
                        <thead>
                            <th></th>
                            <th>Type</th>
                            <th>Student Name</th>
                            <th>Notes</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Aharoni, Orit</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Bakst, Sara Esther</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Bender, Chana Golda</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Biber, Tamar</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Dahan, Yocheved</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Karp, Esti</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Klein, Temima</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Morgenbesser, Chani</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Orman, Feigel</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>
                                    <div className='dropdown'>
                                        <select name='type'>
                                            <option value=''>Select type</option>
                                            <option value='absent'>Absent</option>
                                            <option value='late'>Late</option>
                                            <option value='cut'>Cut</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Ostreicher, Raizy</td>
                                <td><textarea rows="1"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='text-center'>
                        <input type='checkbox'></input>
                        100% attendance!
                        <br></br>
                        <br></br>
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default ClassList;