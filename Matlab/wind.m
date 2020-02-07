%% Dynamisk Vind med byar
function wind_data = wind(length, base_wind)

wind_data = zeros(1, length);
stayPut = 0;

for n = 1:length
    if (stayPut ~= 0) 
        wind_data(n) = wind_data(n-1);
        stayPut = stayPut-1;
    end
    dice = ceil(10*rand(1));
    if (dice < 3 && stayPut == 0)
        byar = 10*rand(1);
        wind_data(n) = base_wind + byar;
        stayPut = 10-round(rand(1)*5);
    elseif (stayPut == 0)
        wind_data(n) = base_wind;
    end
end

wind_data = smoothdata(wind_data);
wind_data = smoothdata(wind_data);

end