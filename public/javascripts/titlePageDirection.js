window.onload = function() {
  
  var img = document.querySelectorAll('img');
  var td = document.querySelectorAll('td');
  var label = document.querySelectorAll('label');
  
  for(var i of img) {
    i.classList.add('imgClass');
    i.addEventListener('click', function() {
      var pn = e.target.parentNode;
      var chi = pn.childrens;
      for(c of chi) {
        if(c.tagName == 'INPUT') {
          c.checket = true;
        }
      }
    });
  }
  for(var t of td) {
      t.classList.add('text-center');
  };
  for(var l of label) {
    if(l.parentNode.tagName == 'TD') {
      l.classList.add('label-style');
    }
  }

  tassel.addEventListener('click', function(e) {
    var ibcl = ib.classList;
    var tcl = tassel.classList;
    if(ib.clientWidth < 70) {
      tb.innerHTML = 'Roll Up';
      ibcl.remove('roll-up');
      tcl.remove('roll-up-tassel');
      ibcl.add('expand');
      tcl.add('expand-tassel');
      ab.removeAttribute('hidden');
    } else {
      tb.innerHTML = 'Expand';
      ibcl.remove('expand');
      tcl.remove('expand-tassel');
      ibcl.add('roll-up');
      tcl.add('roll-up-tassel');
      ab.setAttribute('hidden', true);
    }
  });
  
};


