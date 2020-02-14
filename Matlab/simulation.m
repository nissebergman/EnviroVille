% Simulation parameters
t_end = hr2sec(1);  % End time of simulation
h = 1;              % Time step

% WIND POWER
% Wind turbine parameters
m = 5000 * 3;       % Mass (three rotor blades)
r = 30;             % Radius (length of blade)
A = r ^ 2 * pi;     % Area
J = m * r^2 / 3;    % Moment of inertia (approx. thin rod)
C = 0.04;           % Wind resistance coefficient
rho = 1.25;         % Air density
tsr = 8;            % Tip-to-speed ratio, 8 corresponding roughly to optimal Cp

% Generator properties
R = 0.25;           % Generator resistance
L = 0.01;           % Generator inductance
Ki = 1;             % Torque -> Current (???)
Ke = 1;             % Back-EMF coefficient (???)

% Initial conditions
base_wind = 10;
omega = 0;          % Angular velocity (of wind turbine)
theta = 0;          % Angular acceleration (of wind turbine)
u = 0;              % Voltage (Volts)
i = 0;              % Current (Amperes)
wind_E = 0;         % Energy  (Watt seconds)

t = 0:h:t_end;
wind_velocity = coherent_noise(length(t), base_wind, 10, 10, 5);

% SOLAR POWER
% Solar panel properties
% sun_intensity = [3360 540 1140];
sun_intensity = [1000 300 200];
efficiency = 0.15;
num_panels = 50;
solar_E = 0;

cloudiness = coherent_noise(length(t), 15, 85, 7200, 5400);

% WATER POWER
% Water properties
N = 0.90;       % Turbinens verkningsgrad (Ofta kring 90%)
Rho = 997;      % Water density (kg/m^3)
Q = 45;         % Installerad turbinvattenf?ring i kubikmeter/sekund
g = 9.82;       % Gravity
H = 10;         % Fallh?jd ?ver turbinen
water_E = 0;

% Saved values to be plotted
omega_saved = zeros(length(t), 1);
solar_E_saved = zeros(length(t), 1);
wind_E_saved = zeros(length(t), 1);
water_E_saved = zeros(length(t), 1);

% Simulation loop
for n = 1:1:length(t)
    % Wind turbine
    breaking_force = windmill_controller(omega, wind_velocity(n)*tsr/r);
    wind_force = 0.5 * rho * C * A * wind_velocity(n)^2;
    wind_torque = wind_force * r/2;
    tau = wind_torque - breaking_force*r;
    
    alpha = tau / J ;
    omega = euler_solve(omega, h, alpha);
    theta = euler_solve(theta, h, omega);
    
    % Generator
    i = tau / Ki;
    u = R*i + Ke*omega;
    P = u*i;
    wind_E = euler_solve(wind_E, h, P);
    
    % Solar panels
    time_block = mod(floor(n / (hr2sec(8)+1)), 3);
    current_intensity = sun_intensity(time_block+1);
    
    solar_P = current_intensity * num_panels * efficiency * cloudiness(n);
    solar_E = euler_solve(solar_E, h, solar_P);
    
    % Water
    water_P = N * Rho * Q * g * H; %Ekvation f?r vattenkraft
    water_E = euler_solve(water_E, h, water_P);

    % Save data to plot
    omega_saved(n) = omega;
    wind_E_saved(n) = wind_E;
    solar_E_saved(n) = solar_E;
    water_E_saved(n) = water_E;
end

figure('NumberTitle', 'off', 'Name', 'Angular velocity of the windmill')
plot(omega_saved ./ (2*pi), 'b');

% Do plots
% subplot(3,1,1);
% plot(wind_velocity);
% title('Windspeed');
% 
% subplot(3,1,2);
% %figure('NumberTitle', 'off', 'Name', 'Angular velocity of the windmill')
% plot(omega_saved ./ (2*pi), 'b');
% title('Angular velocity of the windmill');
% %xlim([hr2sec(8) hr2sec(9)])
% 
% %ylim([3 6])
% subplot(3,1,3)
% %figure('NumberTitle', 'off','Name', 'Power output of windmill in kWh')
% plot(wind_E_saved ./ (1000*60*60), 'r');
% title('Power output of windmill in kWh');
% %xlim([hr2sec(8) hr2sec(9)])
% 
% %figure('NumberTitle', 'off','Name', 'Power output of windmill in kWh')
% figure
% plot(solar_E_saved ./ (1000*60*60), 'b');
% title('Power output sun panel in kWh');
% %xlim([hr2sec(8) hr2sec(9)])


