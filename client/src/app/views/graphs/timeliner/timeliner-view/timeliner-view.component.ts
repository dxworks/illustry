import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-timeliner-view',
  templateUrl: './timeliner-view.component.html',
  styleUrls: ['./timeliner-view.component.css']
})

export class TimelinerViewComponent implements OnInit {
  @Input()
  data: any
  divShowData: any;
  timelinerString: string = ""
  constructor() { }

  ngOnInit(): void {
    this.createTimeline()
  }
  private createTimeline() {
    const style = `<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    *{
      padding:0px;
      margin:0px;
      box-sizing:border-box;
      font-family:'Poppins', sans-serif;
      perspective:800px;
    }
    .allmonitor 
      {
        width:100%;
        min-height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
      }
      .timeline{
        width:100%;
        color:#fff;
        padding:30px 20px;
      }
      .timeline ul{
        list-style-type:none;
        border-left:2px solid #094a68;
        padding:10px 5px;
      }
      .timeline ul li{
        padding:20px 20px;
        position:relative;
        transition:.5s;
      }
      .timeline ul li span{
        display:inline-block;
        border-radius:25px;
        color:black;
        font-size:15px;
        text-align:center;
      }
      .timeline ul li .content .commitmessage {
        color:black;
        font-size:17px;
        padding-top:5px;
        margin:10px;
      }

      .timeline ul li .content p{
        padding:5px 0px 15px 0px;
        font-size:15px;
        color:black
      }
      .timeline ul li:before{
        position:absolute;
        content:'';
        width:10px;
        height:10px;
        background-color:black;
        border-radius:50%;
        left:-11px;
        top:28px;
        transition:.5s;
      }
      .BtnGroup {
        display: inline-block;
        vertical-align: middle;
        float: right; 
      }
      .tooltipped-sw::after {
        margin-right: -16px;
      }
      .tooltipped-s::after, .tooltipped-se::after, .tooltipped-sw::after {
        top: 100%;
        right: 50%;
        margin-top: 6px;
      }
      .tooltipped::after {
        position: absolute;
        z-index: 1000000;
        display: none;
        padding: .5em .75em;
        font: normal normal 11px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
        -webkit-font-smoothing: subpixel-antialiased;
        color: var(--color-fg-on-emphasis);
        text-align: center;
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: break-word;
        white-space: pre;
        pointer-events: none;
        content: attr(aria-label);
        background: var(--color-neutral-emphasis-plus);
        border-radius: 6px;
        opacity: 0;
      }
      .tooltipped-s::before, .tooltipped-se::before, .tooltipped-sw::before {
        top: auto;
        right: 50%;
        bottom: -7px;
        margin-right: -6px;
        border-bottom-color: var(--color-neutral-emphasis-plus);
      }
      .tooltipped::before {
        position: absolute;
        z-index: 1000001;
        display: none;
        width: 0;
        height: 0;
        color: var(--color-neutral-emphasis-plus);
        pointer-events: none;
        content: "";
        border: 6px solid transparent;
          border-bottom-color: transparent;
        opacity: 0;
      }
      .BtnGroup-item:last-child {
        border-right-width: 1px;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
      .BtnGroup-item:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }
      .BtnGroup-item {
        position: relative;
        float: left;
        border-right-width: 0;
        border-radius: 0;
      }
      .btn-outline {
        color: var(--color-btn-outline-text);
      }
      .btn {
        color: var(--color-btn-text);
        background-color: var(--color-btn-bg);
        border-color: var(--color-btn-border);
        box-shadow: var(--color-btn-shadow),var(--color-btn-inset-shadow);
        transition: .2s cubic-bezier(0.3, 0, 0.5, 1);
          transition-property: all;
        transition-property: color,background-color,border-color;
      }
      .btn {
        position: relative;
        display: inline-block;
        padding: 5px 16px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        user-select: none;
        border: 1px solid;
          border-top-color: currentcolor;
          border-right-color: currentcolor;
          border-right-width: 1px;
          border-bottom-color: currentcolor;
          border-left-color: currentcolor;
        border-radius: 6px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      a {
        color: var(--color-accent-fg);
        text-decoration: none;
      }
      .box {
        margin-top:20px;
        border-radius: 25px;
        border: 2px solid black;
      }
     
   </style>`
    this.timelinerString = `${style}
    <div class ="allmonitor">
      <div class = "timeline">
      <ul id="timeliner">
      ${this.createTimeLineElement(this.data.commits)}
      </ul>
      </div>
    </div>`
    this.divShowData = document.getElementById('showData')
    this.divShowData.innerHTML = this.timelinerString
    this.modalAppear(this.data.commits)
  }
  createTimeLineElement(datas: any[]) {
    let finalString = ""
    let data = datas.sort(function compare(a, b) {
      var dateA: any = new Date(a.date);
      var dateB: any = new Date(b.date);
      return dateA - dateB;
    });
    let commitMessage = new Set()
    let commit = new Set()
    for (let i = 0; i < data.length - 1; i++) {
      if (moment(moment(data[i].date).format('YYYY-MM-DD')) != (moment(moment(data[i + 1].date).format('YYYY-MM-DD')))) {
        commitMessage.add(`${moment(data[i].date).format('DD')} ${moment(data[i].date).format('MMMM').slice(0, 3)} ${moment(data[i].date).format('Y')}`)
        commit.add(data[i])
        commit.add(data[i + 1])
      }
      else {
        commitMessage.add(`${moment(data[i + 1].date).format('DD')} ${moment(data[i + 1].date).format('MMMM').slice(0, 3)} ${moment(data[i + 1].date).format('Y')}`)
        commit.add(data[i + 1])
      }
    }

    const commitMessageArray = Array.from(commitMessage).sort(function compare(a: any, b: any) {
      var dateA: any = new Date(a);
      var dateB: any = new Date(b);
      return dateB - dateA;
    })
    const commitArray = Array.from(commit)
    _.forEach(commitMessageArray, (comMess: any) => {
      finalString = finalString + `<li><span>${comMess}</span> `
      _.forEach(commitArray, (com: any) => {
        if (comMess === `${moment(com.date).format('DD')} ${moment(com.date).format('MMMM').slice(0, 3)} ${moment(com.date).format('Y')}`) {
          finalString = finalString + `<div class="content">
          <div class="box">
            <div class="commitmessage">
              ${com.commitMessage}
              <div class="BtnGroup">
                <a
                  aria-label="Browse the repository at this point in the history"
                  class="BtnGroup-item btn btn-outline tooltipped tooltipped-sw"
                  rel="nofollow"
                  ><svg
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    class="octicon octicon-code"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"
                    ></path></svg
                ></a>
              </div>
            </div>
            <div class="commitmessage">${com.username} has commited ${this.calculateDifferencesForDates(com.date)}</div>
          </div>
        </div>
        `
        }
      })
    })
    finalString = finalString + "</li>"
    return finalString
  }
  modalAppear(datas: any) {
    var modals = document.querySelectorAll('.box');
    let data = datas.sort(function compare(a: any, b: any) {
      var dateA: any = new Date(a.date);
      var dateB: any = new Date(b.date);
      return dateB - dateA;
    });
    modals.forEach((m, index) => {
      m.addEventListener('click', (event: any) => {
      })
    })
  }
  calculateDifferencesForDates(d1: any) {
    let date1 = moment(d1)
    let date2 = moment()

    if (date2.diff(date1, 'months') < 12 && date2.diff(date1, 'months') != 0) {
      return `${date2.diff(date1, 'months')} months ago`
    }
    else {
      if (date2.diff(date1, 'minutes') < 60 && date2.diff(date1, 'minutes') != 0) {
        return `${date2.diff(date1, 'minutes')} minutes ago`
      } else {
        if (date2.diff(date1, 'hours') < 24 && date2.diff(date1, 'hours') != 0) {
          return `${date2.diff(date1, 'hours')} hours ago`
        }
        else {
          if (_.toNumber(date2.format('YYYY')) % 4 === 0 && _.toNumber(date2.format('YYYY')) % 100 != 0) {
            switch (moment().format("MMMM")) {
              case "January": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "February": if (date2.diff(date1, 'days') < 29 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "March": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "April": if (date2.diff(date1, 'days') < 30 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "May": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "June": if (date2.diff(date1, 'days') < 30 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "July": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "August": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "September": if (date2.diff(date1, 'days') < 30 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "Octomber": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "November": if (date2.diff(date1, 'days') < 30 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              case "December": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
            }
          }
          else {
            if ((_.toNumber(date2.format('YYYY')) % 4 === 0 && _.toNumber(date2.format('YYYY')) % 100 === 0) || _.toNumber(date2.format('YYYY')) % 4 != 0) {
              switch (moment().format("MMMM")) {
                case "January": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "February": if (date2.diff(date1, 'days') < 29 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "March": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "April": if (date2.diff(date1, 'days') < 30 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "May": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "June": if (date2.diff(date1, 'days') < 30 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "July": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "August": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "September": if (date2.diff(date1, 'days') < 30 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "Octomber": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "November": if (date2.diff(date1, 'days') < 30 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
                case "December": if (date2.diff(date1, 'days') < 31 && date2.diff(date1, 'days') != 0) { return `${date2.diff(date1, 'days')} days ago` } break;
              }
            }
          }
        }
      }
    }
    return `${date2.diff(date1, 'year')} years ago `
  }
}



