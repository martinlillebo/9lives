class CatsController < ApplicationController
  def index
    @cats = Cat.all
  end

  def show
    @cat = Cat.find(params[:id])
  end

  def new
    @cat = Cat.new
  end

  def create
    @new_cat = Cat.create!(strong_params)
  end

  private

  def strong_params
    params.require(:cat).permit(:name, :gender, :breed, :allergies, :mood) #returns a hash with the listed key/value pairs
  end

end
