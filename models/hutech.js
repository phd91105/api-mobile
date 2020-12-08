let request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const periodBoard = require('./periodBoard');
const API_SERVER = 'http://daotao.hutech.edu.vn';

class APIHutech {
    constructor() {
        this.jar = request.jar();
        request = request.defaults({
            headers: {
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': 1,
                'DNT': 1,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Language': 'en-US,en;q=0.9',
                'Content-Type': 'multipart/form-data',
                'Connection': 'keep-alive',
            }
        });
    }
    getSchedule(idStudent) {
        return new Promise(async (resolve, reject) => {
            try {
                let schedule = [];
                const $ = await this.requestServer({
                    pathURI: '/default.aspx?page=thoikhoabieu&sta=0&id=' + idStudent,
                    isTransform: true
                });
                let contentStudent = $('#ctl00_ContentPlaceHolder1_ctl00_lblContentTenSV').text().split('-');
                let classStudent = $('#ctl00_ContentPlaceHolder1_ctl00_lblContentLopSV').text().split('-');
                let parentTable = $('#ctl00_ContentPlaceHolder1_ctl00_Table1').children('tbody').children();

                parentTable.map(function () {
                    $(this).children().map(function () {
                        let element = $(this).attr('onmouseover');
                        if (element) {
                            let item = element.split(',');
                            let startPeriod = parseInt(item[6].slice(0, -1).slice(1));
                            let numberOfPeriods = parseInt(item[7].slice(0, -1).slice(1));
                            schedule.push({
                                nameSubject: item[1].slice(0, -1).slice(1),
                                codeSubject: item[2].slice(0, -1).slice(1),
                                dayOfWeek: item[3].slice(0, -1).slice(1),
                                room: item[5].slice(0, -1).slice(1),
                                nameTeacher: item[8].slice(0, -1).slice(1),
                                timeStart: periodBoard[startPeriod].start,
                                timeStop: periodBoard[startPeriod + numberOfPeriods - 1].end,
                            });
                        }
                    });
                });

                resolve({
                    name: contentStudent[0].trim(),
                    birthday: contentStudent[1].split(':')[1].trim(),
                    class: classStudent[0].trim(),
                    majors: classStudent[1].split(':')[1].trim(),
                    specialty: classStudent[2].split(':')[1].trim(),
                    schedules: schedule
                });

            } catch (error) {
                reject(error);
            }
        });
    }
    requestServer(data = { pathURI, formData: '', isTransform: false }) {

        let form = {
            uri: API_SERVER + data.pathURI,
            jar: this.jar,
            method: (typeof data.formData === 'object') ? 'post' : 'get',
            formData: data.formData
        };

        if (data.isTransform) form.transform = body => cheerio.load(body);
        return request(form);
    }
}
module.exports = APIHutech;