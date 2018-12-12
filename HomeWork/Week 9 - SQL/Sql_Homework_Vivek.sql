use sakila;
#1a. Display the first and last names of all actors from the table actor.
select first_name as 'First Name', last_name as 'Last Name' 
  from actor;
  
#1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name.
select CONCAT(UPPER(first_name), ' ', UPPER(last_name)) as 'Actor Name' 
  from actor;
  
#2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
select actor_id as 'ID number', first_name as 'First Name', last_name as 'Last Name' 
  from actor
 where first_name = 'Joe';
 
#2b. Find all actors whose last name contain the letters GEN:
select actor_id as 'ID number', first_name as 'First Name', last_name as 'Last Name', last_update as 'Last Update' 
  from actor
 where UPPER(last_name) like '%GEN%';
 
#2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order:
select actor_id as 'ID number', first_name as 'First Name', last_name as 'Last Name', last_update as 'Last Update' 
  from actor
 where UPPER(first_name) like '%LI%'
 order by last_name, first_name;
 
#2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:
select country_id as 'Country ID', country as 'Country Name'
  from country
 where country in ('Afghanistan','Bangladesh','China');
 
#3a. You want to keep a description of each actor. You don't think you will be performing queries on a description, so create a column in the table actor named description and use the data type BLOB (Make sure to research the type BLOB, as the difference between it and VARCHAR are significant).
alter table actor
 add column description BLOB AFTER last_name;
	 select * from actor;

#3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the description column.
alter table actor
drop column description;
     select * from actor;

#4a. List the last names of actors, as well as how many actors have that last name.
  select last_name as 'Last Name', count(last_name) as 'Number of actors with this name' 
    from actor
group by last_name;

#4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors.
  select last_name as 'Last Name', count(last_name) as 'Number of actors with this name' 
    from actor
group by last_name
  having count(last_name) >1;

#4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS. Write a query to fix the record.
select actor_id, first_name, last_name
  from actor 
 where first_name = 'GROUCHO' 
   and last_name = 'WILLIAMS';
update actor
   set first_name = 'HARPO' , last_name = 'WILLIAMS'
 where actor_id = 172;
select actor_id, first_name, last_name
  from actor 
 where actor_id = 172;

#4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO.
update actor
   set first_name = 'GROUCHO'
 where first_name = 'HARPO'
   and actor_id = 172;
select actor_id, first_name, last_name
  from actor 
 where actor_id = 172;

#5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
describe address;
SHOW CREATE TABLE address;

#6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:
   select s.first_name as 'Staff First Name', s.last_name as 'Staff Last Name', a.address as 'Address Line 1', a.address2 as 'Address Line 2', a.district as 'District', c.city as 'City', a.postal_code as 'Zip Code' 
     from staff s 
left join address a on s.address_id = a.address_id
left join city c on a.city_id = c.city_id;

#6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment.
   select s.first_name as "Staff First Name", s.last_name as "Staff Last Name", sum(p.amount) as "Amount rung up in August of 2005"
     from staff s 
left join payment p on s.staff_id = p.staff_id
    where month(p.payment_date) = 8
 group by p.staff_id;

#6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.
   select f.title as "Title", count(actor_id) as "Number of actors"
      from film f
inner join film_actor fa on f.film_id = fa.film_id
  group by f.film_id;

#6d. How many copies of the film Hunchback Impossible exist in the inventory system?
   select f.title as "Title", count(inventory_id) as "Number of copies in inventory"
     from film f
left join inventory i on f.film_id = i.film_id
    where f.title = 'Hunchback Impossible';

#6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name:
   select c.first_name as 'Customer First Name', c.last_name as 'Customer Last Name', sum(p.amount) as 'Total paid by each customer' from customer c
left join payment p on c.customer_id = p.customer_id
 group by c.customer_id
 order by c.last_name;

#7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters K and Q have also soared in popularity. Use subqueries to display the titles of movies starting with the letters K and Q whose language is English.
select title as 'Film Title'
  from film
 where title like 'K%' or title like 'Q%'
   and title in (select f.title 
				   from film f 
                   join language l on f.language_id = l.language_id
				  where l.name = 'English');

#7b. Use subqueries to display all actors who appear in the film Alone Trip.
select first_name as 'First Name of actor in Alone Trip', last_name as 'Last Name of actor in Alone Trip'
  from actor
 where actor_id in (select actor_id 
					  from film_actor 
					 where film_id in (select film_id 
										 from film
										where title = 'Alone Trip'));

#7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.
select c.first_name, c.last_name, c.email, ctr.country 
  from customer c 
  join address a on a.address_id = c.address_id
  join city ct on a.city_id = ct.city_id
  join country ctr on ct.country_id = ctr.country_id
 where ctr.country = 'Canada';

#7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as family films.
select * from film f
  join film_category fc on f.film_id = fc.film_id
  join category c on fc.category_id = c.category_id
 where c.name = 'Family';

#7e. Display the most frequently rented movies in descending order.
  select f.title as 'Film Name', count(r.rental_id) as 'Total number of rentals' 
    from rental r
    join inventory i on r.inventory_id = i.inventory_id
    join film f on f.film_id = i.film_id
group by f.film_id
order by count(rental_id) desc;

#####7f. Write a query to display how much business, in dollars, each store brought in.
  select s.store_id as "Store ID" , sum(p.amount) as "Total business in dollars"
    from rental r
    join inventory i on r.inventory_id = i.inventory_id
    join store s on s.store_id = i.store_id
    join film f on f.film_id = i.film_id
    join payment p on p.rental_id = r.rental_id
group by s.store_id;

#7g. Write a query to display for each store its store ID, city, and country.
   select store_id as 'Store ID', cty.city as 'Store City', c.country as 'Store Country'
     from store s
left join address a  on a.address_id = s.address_id
left join city cty on cty.city_id = a.city_id
left join country c on cty.country_id = c.country_id;

#7h. List the top five genres in gross revenue in descending order. (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
   select name as "Category Name", sum(p.amount) as "Gross Revenue"
	 from film f
left join film_category fc on fc.film_id = f.film_id
left join category c on c.category_id = fc.category_id
left join inventory i on i.film_id = f.film_id
left join rental r on r.inventory_id = i.inventory_id
left join payment p on p.rental_id = r.rental_id
 group by fc.category_id
 order by sum(p.amount) desc
    limit 5;

#8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.
create view gross_revenue_top_5_generes AS
     select name as "Category Name", sum(p.amount) as "Gross Revenue"
	   from film f
  left join film_category fc on fc.film_id = f.film_id
  left join category c on c.category_id = fc.category_id
  left join inventory i on i.film_id = f.film_id
  left join rental r on r.inventory_id = i.inventory_id
  left join payment p on p.rental_id = r.rental_id
   group by fc.category_id
   order by sum(p.amount) desc
      limit 5;

#8b. How would you display the view that you created in 8a?
select * from gross_revenue_top_5_generes;

#8c. You find that you no longer need the view top_five_genres. Write a query to delete it.
drop view if exists gross_revenue_top_5_generes;
