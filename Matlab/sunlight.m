function irradiation = sunlight(sun_rise, sun_set, noon, max_irr)
n = 2;    % Transient parameter

% Time vectors
t = 0:1:hr2sec(24);
t_AM = sun_rise:1:noon;
t_PM = noon+1:1:sun_set;

% Calculate irradiation
iter_AM = (t_AM-sun_rise) ./ (noon-sun_rise);
iter_PM = (t_PM-sun_set) ./ (noon-sun_set);
iter = [iter_AM iter_PM] * 4 / pi;

irradiation = zeros(length(t), 1);
irradiation(sun_rise:sun_set) = sin(iter .^ n);
irradiation = irradiation .* max_irr;

end