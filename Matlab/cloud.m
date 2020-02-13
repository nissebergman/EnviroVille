function cloud_data = cloud(length, sun_cloud)

cloud_data = zeros(1,length);

for n = 1:length
    clouds = 85*rand(1);
    cloud_data(n) = sun_cloud + clouds;
end

cloud_data = smoothdata(cloud_data);

plot(cloud_data);

end

%%
%om vi t?nker att det finns 100% av ljus som n?r igenom p? en molnfri dag,
%hur m?nga procent n?r igenom p? en molnig dag och f?r man in 0 procent p?
%natten

%Svar: verkar vara 0 % p? natten, eller det antar vi men ungef?r 10-25% av
%den energi som skulle produceras p? en solig dag produceras under en
%molnig dag.

%ca 65% av v?rlden ?r t?ckt av moln. En "mulen dag" m?ste mer ?n 75% av 
%himlen vara t?ckt av moln

%g?r en funktion som delar upp dygnet i 4 delar d?r 2 delar t?nks ha
%solljus. Men av denna halva dag ska 65% vara mulen sammanlagt. Dvs det ska
%variera fr?n 0% molnighet till 100% molnighet men "centrum" ska vara 65%

%%






