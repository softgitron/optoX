FROM postgres:latest
WORKDIR /config

COPY . .
RUN cp /config/postgresql.conf /etc/postgresql/postgresql.conf
RUN chown postgres /etc/postgresql/postgresql.conf
RUN chgrp postgres /etc/postgresql/postgresql.conf
RUN mv /config/initdb.sh /docker-entrypoint-initdb.d
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]