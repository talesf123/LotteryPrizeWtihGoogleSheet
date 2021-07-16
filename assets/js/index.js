/*
example:
google sheet url:https://docs.google.com/spreadsheets/d/155EsDnK350pNfUStiUQYKwU3EjUEa8XTRq_WbWiBmaI/edit#gid=0
google_file_feed_id = 'gbnm1212fdsf5454g5fds4g5fd4sngf'
*/
const
  google_file_feed_id = '155EsDnK350pNfUStiUQYKwU3EjUEa8XTRq_WbWiBmaI',
  url = `https://spreadsheets.google.com/feeds/list/${google_file_feed_id}/1/public/values?alt=json`,
  duration = 3500; // 拉霸效果執行多久
var member_data, btn = $('.btn-start');
fetch(url)
  .then(res => res.json())
  .then(data => {
    var all_data = data.feed.entry;
    var member_data = [], member_list = [];
    var cnt;
    all_data.forEach(function(o){
      cnt = parseInt(o.gsx$摸彩卷.$t);
      member_data = member_data.concat(Array(cnt).fill(o.gsx$姓名.$t));
      member_list.push(o.gsx$姓名.$t);
      console.log(o.gsx$姓名.$t, cnt)
    });
    $('body').append(`<style>${spin_style(member_list.length)}</style>`);
    member_data = shuffle(member_data);
    // 按鈕
    btn.on('click', function(e){
      e.preventDefault();
      // 禁止按鈕再被點擊
      $(this).addClass('not-allow');
      const chooseOne = toggle => {
        toggle = shuffle(toggle);
        // 清空、插入選項
        let input = document.querySelector('.wrap');
        input.innerHTML = '';
        for(let i = 0; i < toggle.length; i++) {
          input.insertAdjacentHTML('beforeend', '<span>' + toggle[i] + '</span>');
        }
        // 加入動畫 class name
        const list = document.querySelectorAll('.wrap > span');
        Array.prototype.forEach.call(list, l => l.classList.add('span-' + (toggle.length - 1)));
        // 亂數
        var ind = r(member_data.length - 1);
        list[0].innerText = member_data[ind];
        // remove ticket
        member_data.splice(ind, 1);
        // 移除動畫
        setTimeout(() => {
          Array.prototype.forEach.call(list, l => l.removeAttribute('class'));
          btn.removeClass('not-allow');
        }, duration);
      };
      chooseOne(member_list);
    });
  }
);