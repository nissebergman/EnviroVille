%% Sammanh?ngande brus
function noise_data = coherent_noise(data_length, base_value, value_variation, max_var, length_var)

noise_data = zeros(1, data_length);
stayPut = 0;

for n = 1:data_length
    if (stayPut ~= 0) 
        noise_data(n) = noise_data(n-1);
        stayPut = stayPut-1;
    end
    
    dice = ceil(10*rand(1));
    
    if (dice < 3 && stayPut == 0)
        noise_data(n) = base_value + value_variation*rand(1);
        stayPut = max_var-round(rand(1)*length_var);
    elseif (stayPut == 0)
        noise_data(n) = base_value;
    end
end

end