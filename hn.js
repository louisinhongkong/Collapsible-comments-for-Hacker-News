
function doit() {
    if (typeof $('document') !== 'undefined') {
        if (!$('body').hasClass('collapsible-comments')) {
            
            $('body').addClass('collapsible-comments');
            var span_html = '<span style=\'cursor:pointer;margin-left:10px;\' class=\'expand-handle\'>[-]</span>';
            
            if (window.location.href.indexOf('item?id=') != -1) {
                $('center > table > tbody > tr:eq(2) > td > table:eq(1) span.comhead').append(span_html);
                rowTable = $('center > table > tbody > tr:eq(2) > td > table:eq(1) > tbody > tr');
            } else if (window.location.href.indexOf('threads?id=') != -1) {
                $('center > table > tbody > tr > td > table span.comhead').append(span_html);
                rowTable = $('center > table > tbody > tr').slice(3,-1);
            }
            
            
        	
        	var count=0;
            var setWidth = 40;
            rowTable.each(function(index){
        	
            	var thisWidth = parseInt($('tbody > tr > td > img', this).attr('width'), 10);
            	level = thisWidth/setWidth; 
            	
            	$(this).attr("row",index);
            	$(this).attr("class","row");
            	$(this).attr("level",level);
            	//$(this).closest('tr').find('u').append(" row="+index+" level="+level);
        	});	
        	


        	//find the rows where the branch ends
        	$('tr.row').each(function(){
            	level = parseInt($(this).attr("level"),10);
            	row = parseInt($(this).attr("row"),10);
            	rowInQuestion = $(this);
            	totalRows = $('tr.row').length;
            	$('tr.row').slice(row,totalRows).each(function()
            	{
            		level_ = parseInt($(this).attr("level"),10);
            		row_ = parseInt($(this).attr("row"),10);
            		if(level>=level_ && row_>row)
            		{
            			
            			end = $(this).attr("row")-1;
            			rowInQuestion.attr("end",end);
	            		//rowInQuestion.closest('tr').find('u').eq(0).append(" end="+end);
	            		return false;
	            		
            		}
            		
            		if(row_==totalRows-1)
            		{
            	
            			end = row_;
            			rowInQuestion.attr("end",end);
	            		//rowInQuestion.closest('tr').find('u').eq(0).append(" end="+end);
	            		return false;
            		}
            	});
        	            		            	
        	});
        	

        	
        	//wrap all rows in divs
        	$('tr.row').each(function(){
        		end = $(this).attr("end");
        		level = parseInt($(this).attr("level"),10);
        		row = $(this).attr("row");
        		bgColor = (level % 2 == 1) ? 'rgb(246, 246, 239)' : '#F7F7F8' ;
        		marginLeft = (level == 0) ? '' : 'margin-left:28px;';
        		style = '-webkit-border-radius: 3px; border-radius: 3px; border:1px solid #e6e6e6; padding:5px 0px; border-right:0px; margin-bottom:5px; '+marginLeft+' background:'+bgColor;
            	$(this).wrap('<div class="row" row="'+row+'" end="'+end+'" level="'+level+'" style="'+style+'">');
            	$('tbody > tr > td > img', this).attr('width','0');
        	});
        	
        	
        	$('div.row').each(function(){
            	end = parseInt($(this).attr("end"),10);
            	row = parseInt($(this).attr("row"),10);
            	rowInQuestion = $(this);
            	$('div.row').slice(row,end+1).each(function(){
	            	row_ = parseInt($(this).attr("row"),10);
	            	if(row_>row && row_<=end)
	            	{
		            	rowInQuestion.append($(this));
	            	}
            	});
        	});
        	      	
        	
        	$('.expand-handle').live('click',function() {
        		$(this).text('[+]').addClass('expand-handle-collapsed').removeClass('expand-handle');
                $(this).closest('tr.row').nextAll().hide();
                $(this).closest('span.comhead').parent().next().nextAll().hide();
        		
        		children = parseInt($(this).closest('tr.row').attr('end'),10) - parseInt($(this).closest('tr.row').attr('row'),10);
        		spanChildren = '<span style=\'margin-left:10px;\' class=\'childCount\'>('+children+' children)</span>';
        		$(this).closest('span.comhead').append(spanChildren);
        		$(this).closest('span.comhead').css('font-style','italic');                
            });
            
            $('.expand-handle-collapsed').live('click',function() {
        		$(this).text('[-]').addClass('expand-handle').removeClass('expand-handle-collapsed');
                $(this).closest('tr.row').nextAll().show();
        		$(this).closest('span.comhead').parent().next().nextAll().show();
        		
        		$(this).closest('span.comhead').find('span.childCount').remove();
        		$(this).closest('span.comhead').css('font-style','normal');
            
            });
            
        }
    }
    
}


doit();


