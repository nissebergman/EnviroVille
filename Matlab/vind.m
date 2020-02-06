%%Dynamisk Vind med byar
x = 1:1:100;
cVind = 5;
%byar = 5*rand(1,length(x));
stayPut = 0;
for n = 1:100
    if (stayPut ~= 0) 
        y(n) = y(n-1);
        stayPut = stayPut-1;
    end
    dice(n) = ceil(10*rand(1));
    if (dice(n) < 3 && stayPut == 0)
        byar = 5*rand(1);
        y(n) = cVind + byar;
        stayPut = 10-round(rand(1)*5);
    elseif (stayPut == 0)
        y(n) = cVind;
    end

end
y = smoothdata(y);
y = smoothdata(y);
plot(x,y);
axis([0 100 0 10]);

% x = 1:1:100;
% cVind = 5;
% y = 100*rand(1,100) < 30;
% plot(x,y)